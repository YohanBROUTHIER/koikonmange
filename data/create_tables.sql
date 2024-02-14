BEGIN;


DROP FUNCTION IF EXISTS
  create_user(json), find_user(), find_user(int), update_user(json), delete_user(int),
  create_user_key(json), find_user_key(json), delete_user_key(json),
  get_history(int), create_history(json), delete_history(int),
  get_valid_recipe_history(INT),
  create_family(json), find_family(), find_family(int), update_family(json), delete_family(int),
  create_recipe(json), find_recipe(), find_recipe(int), update_recipe(json), delete_recipe(int),
  create_ingredient(json), find_ingredient(), find_ingredient(int), update_ingredient(json), delete_ingredient(int),
  add_family_to_ingredient(json), remove_family_to_ingredient(json);

DROP VIEW IF EXISTS short_family_view, extends_ingredient, extends_recipe;

DROP TYPE IF EXISTS short_user, history_with_recipe, short_family, short_recype, short_ingredient;

DROP TABLE IF EXISTS "user", "user_key", "history", "history_has_recipe",
"family", "recipe", "ingredient", "unit", "ingredient_has_family", "recipe_has_ingredient", "user_has_recipe" CASCADE;

--  ---------------------------------------- Family table -------------------------------------------------------

CREATE TABLE IF NOT EXISTS "family" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "delete_at" TIMESTAMPTZ
);

--  ---------------------------------------- Family view -------------------------------------------------------

CREATE VIEW short_family_view("id", "name") AS
  SELECT "id","name" FROM "family"
  WHERE "delete_at" IS NULL;


--  ---------------------------------------- Family type -------------------------------------------------------

CREATE TYPE short_family AS (
	"id" int,
  "name" text
);

--  ---------------------------------------- Family function -------------------------------------------------------

CREATE FUNCTION create_family(json) RETURNS "family" AS $$
  INSERT INTO "family"
  ("name") VALUES (($1->>'name')::TEXT)
  RETURNING *
$$ LANGUAGE SQL;

CREATE FUNCTION find_family() RETURNS SETOF short_family AS $$
  SELECT "id","name" FROM "short_family_view"
$$ LANGUAGE SQL;

CREATE FUNCTION find_family(INT) RETURNS short_family AS $$
  SELECT "id","name" FROM "short_family_view"
  WHERE "id" = $1
$$ LANGUAGE SQL;

CREATE FUNCTION update_family(json) RETURNS "family" AS $$
  UPDATE "family" SET (
    "name",
    "updated_at"
  ) = (
    COALESCE(($1->>'name')::TEXT, "name"),
    now()
  )
  WHERE "id" = ($1->>'id')::INT
  RETURNING *
$$ LANGUAGE SQL;

CREATE FUNCTION delete_family(INT) RETURNS "family" AS $$
  UPDATE "family" SET "delete_at"= now()
  WHERE "id" = $1
  AND "delete_at" IS NULL
	RETURNING *
$$ LANGUAGE SQL;


--  ---------------------------------------- Ingredient table ------------------------------------------------------

CREATE TABLE IF NOT EXISTS "ingredient" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "image" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "delete_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "unit" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "type" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "delete_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "ingredient_has_family" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "ingredient_id" int REFERENCES "ingredient"("id") NOT NULL,
  "family_id" int REFERENCES "family"("id") NOT NULL
);


--  ---------------------------------------- Ingredient view ------------------------------------------------------

CREATE VIEW extends_ingredient("id", "name", "image", "families") AS
  SELECT i."id", i."name", i."image", (
    SELECT COALESCE(json_agg(f.*) FILTER (WHERE f.* IS NOT NULL), '[]') FROM short_family_view AS f
    WHERE f."id" IN (SELECT "family_id" FROM "ingredient_has_family" WHERE "ingredient_id" = i."id")
  ) FROM "ingredient" AS i
  WHERE "delete_at" IS NULL;

--  ---------------------------------------- Ingredient type ------------------------------------------------------

CREATE TYPE short_ingredient AS (
	"id" int,
  "name" text,
  "image" text
);

--  ---------------------------------------- Ingredient function ------------------------------------------------------


CREATE FUNCTION create_ingredient(json) RETURNS short_ingredient AS $$
	INSERT INTO "ingredient" (
	  "name",
  	"image"
	)
	VALUES (
  	($1->>'name')::text,
    ($1->>'image')::text
	)
	RETURNING "id", "name", "image"
$$ LANGUAGE sql;

CREATE FUNCTION find_ingredient() RETURNS SETOF extends_ingredient AS $$
	SELECT * FROM extends_ingredient
$$ LANGUAGE sql;

CREATE FUNCTION find_ingredient(int) RETURNS extends_ingredient AS $$
	SELECT * FROM extends_ingredient
  WHERE "id"=$1
$$ LANGUAGE sql;

CREATE FUNCTION update_ingredient(json) RETURNS short_ingredient AS $$
	UPDATE "ingredient" SET (
	  "name",
  	"image",
    "updated_at"
	)
	= (
  	COALESCE(($1->>'name')::text, "name"),
    COALESCE(($1->>'image')::text, "image"),
    now()
	)
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING "id", "name", "image"	
$$ LANGUAGE sql;

CREATE FUNCTION delete_ingredient(int) RETURNS short_ingredient AS $$
	UPDATE "ingredient" SET "delete_at"	= now()
  WHERE "id" = $1
  AND "delete_at" IS NULL
	RETURNING "id", "name", "image"		
$$ LANGUAGE sql;

CREATE FUNCTION add_family_to_ingredient(json) RETURNS ingredient_has_family AS $$
	INSERT INTO "ingredient_has_family" (
	  "ingredient_id",
  	"family_id"
	)
	VALUES (
  	($1->>'ingredientId')::int,
    ($1->>'familyId')::int
	)
	RETURNING "id", "ingredient_id", "family_id"		
$$ LANGUAGE sql;

CREATE FUNCTION remove_family_to_ingredient(json) RETURNS ingredient_has_family AS $$
	DELETE FROM "ingredient_has_family"
  WHERE "ingredient_id" = ($1->>'ingredientId')::int
  AND "family_id" = ($1->>'familyId')::int
	RETURNING *	
$$ LANGUAGE sql;



--  ---------------------------------------- User tables -------------------------------------------------------
CREATE TABLE IF NOT EXISTS "user"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "active" boolean NOT NULL DEFAULT false,
  "is_admin" boolean NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "delete_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "user_key"(
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "type" text NOT NULL,
  "user_id" int REFERENCES "user"("id") NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);


--  ---------------------------------------- User Type -------------------------------------------------------

CREATE TYPE short_user AS (
	"id" int,
  "name" text,
  "email" text,
  "password" text,
  "active" boolean,
  "isAdmin" boolean
);

CREATE FUNCTION create_user(json) RETURNS short_user AS $$
	INSERT INTO "user" (
	  "name",
  	"email",
  	"password"
	)
	VALUES (
  	($1->>'name')::text,
    ($1->>'email')::text,
	  ($1->>'password')::text
	)
	RETURNING "id", "name", "email", "password", "active", "is_admin"
$$ LANGUAGE sql;

CREATE FUNCTION find_user() RETURNS SETOF short_user AS $$
	SELECT "id", "name", "email", "password", "active", "is_admin" FROM "user"
  WHERE "delete_at" IS NULL
$$ LANGUAGE sql;

CREATE FUNCTION find_user(int) RETURNS short_user AS $$
	SELECT "id", "name", "email", "password", "active", "is_admin" FROM "user"
  WHERE "id"=$1
  AND "delete_at" IS NULL
$$ LANGUAGE sql;

CREATE FUNCTION update_user(json) RETURNS short_user AS $$
	UPDATE "user" SET (
	  "name",
  	"email",
  	"password",
    "active",
    "updated_at"
	)
	= (
  	COALESCE(($1->>'name')::text, "name"),
    COALESCE(($1->>'email')::text, "email"),
	  COALESCE(($1->>'password')::text, "password"),
	  COALESCE(($1->>'active')::boolean, "active"),
    now()
	)
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING "id", "name", "email", "password", "active", "is_admin" 	
$$ LANGUAGE sql;

CREATE FUNCTION delete_user(int) RETURNS short_user AS $$
	UPDATE "user" SET "delete_at"	= now()
  WHERE "id" = $1
  AND "delete_at" IS NULL
	RETURNING "id", "name", "email", "password", "active", "is_admin" 		
$$ LANGUAGE sql;

CREATE FUNCTION create_user_key(json) RETURNS "user_key" AS $$
	INSERT INTO "user_key" (
	  "type",
  	"user_id"
	)
	VALUES (
  	($1->>'type')::text,
    ($1->>'user_id')::int
	)
	RETURNING * 	
$$ LANGUAGE sql;

CREATE FUNCTION find_user_key(json) RETURNS "user_key" AS $$
	SELECT * FROM "user_key"
  WHERE "id"=($1->>'id')::uuid
$$ LANGUAGE sql;

CREATE FUNCTION delete_user_key(json) RETURNS "user_key" AS $$
  DELETE FROM "user_key"
  WHERE "id"=($1->>'id')::uuid
  RETURNING *
$$ LANGUAGE sql;


--  ---------------------------------------- Recipe table -------------------------------------------------------


CREATE TABLE IF NOT EXISTS "recipe"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "image" TEXT,
  "steps" TEXT[] NOT NULL,
  "hunger" TEXT NOT NULL DEFAULT 'normal',
  "time" INTERVAL NOT NULL,
  "preparation_time" INTERVAL NOT NULL,
  "user_id" INT REFERENCES "user"(id),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "delete_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "recipe_has_ingredient" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "quantity" text,
  "unit_id" int REFERENCES "unit"("id"),
  "recipe_id" int REFERENCES "recipe"("id") NOT NULL,
  "ingredient_id" int REFERENCES "ingredient"("id") NOT NULL
);

CREATE TABLE IF NOT EXISTS "user_has_recipe" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" int REFERENCES "user"("id") NOT NULL,
  "recipe_id" int REFERENCES "recipe"("id") NOT NULL
);

--  ---------------------------------------- Recipe view ------------------------------------------------------

CREATE VIEW extends_recipe("id", "name", "image", "steps", "hunger", "time", "preparationTime", "cookingTime", "userId", "ingredients") AS
  SELECT r."id", r."name", r."image", r."steps", r."hunger", r."time", r."preparation_time", (r."time" - r."preparation_time"), r."user_id", (
    SELECT COALESCE(json_agg((i.*, (
      SELECT rhi."quantity" FROM recipe_has_ingredient AS rhi WHERE rhi."recipe_id" = r."id"
    ), (
      SELECT u."name" AS "unit" FROM "unit" AS u
      WHERE u."id" IN (SELECT rhi."unit_id" FROM recipe_has_ingredient AS rhi WHERE rhi."recipe_id" = r."id")
    )
    )) FILTER (WHERE i.* IS NOT NULL), '[]') FROM extends_ingredient as i
    WHERE i."id" IN (SELECT rhi."ingredient_id" FROM recipe_has_ingredient AS rhi WHERE rhi."recipe_id" = r."id")
  ) FROM "recipe" AS r
  WHERE "delete_at" IS NULL;

--  ---------------------------------------- Recipe Type -------------------------------------------------------

CREATE TYPE short_recype AS (
	"id" int,
  "name" text,
  "image" TEXT,
  "steps" TEXT[],
  "hunger" TEXT,
  "time" INTERVAL,
  "preparationTime" INTERVAL,
  "cookingTime" INTERVAL,
  "userId" INT
);

--  ---------------------------------------- Recipe Function -------------------------------------------------------

CREATE FUNCTION create_recipe(json) RETURNS "short_recype" AS $$
  INSERT INTO "recipe" (
    "name",
    "image",
    "hunger",
    "steps",
    "time",
    "preparation_time",
    "user_id"
  )
  VALUES (
    ($1->>'name')::text,
    ($1->>'image')::text,
    ($1->>'hunger')::text,
    ARRAY(SELECT json_array_elements_text($1->'steps')),
    ($1->>'time')::INTERVAL,
    ($1->>'preparationTime')::INTERVAL,
    ($1->>'userId')::int
  )
  RETURNING "id","name","image","steps","hunger","time","preparation_time",("time"-"preparation_time") AS "cooking_time","user_id"
$$ LANGUAGE sql;

CREATE FUNCTION find_recipe() RETURNS SETOF extends_recipe AS $$
  SELECT *
  FROM extends_recipe
$$ LANGUAGE sql;

CREATE FUNCTION find_recipe(int) RETURNS extends_recipe AS $$
  SELECT *
  FROM extends_recipe
  WHERE "id"=$1
$$ LANGUAGE sql;

CREATE FUNCTION update_recipe(json) RETURNS "short_recype" AS $$
  UPDATE "recipe" SET (
    "name",
    "image",
    "hunger",
    "steps",
    "time",
    "preparation_time",
    "updated_at"
  )
  = (
    COALESCE(($1->>'name')::text, "name"),
    COALESCE(($1->>'image')::text, "image"),
    COALESCE(($1->>'hunger')::text, "hunger"),
    ARRAY(SELECT json_array_elements_text($1->'steps')),
    COALESCE(($1->>'time')::INTERVAL, "time"),
    COALESCE(($1->>'preparationTime')::INTERVAL, "preparation_time"),
    now()
  )
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
  RETURNING "id","name","image","steps","hunger","time","preparation_time",("time"-"preparation_time") AS "cooking_time","user_id"   
$$ LANGUAGE sql;

CREATE FUNCTION delete_recipe(int) RETURNS "recipe" AS $$
  UPDATE "recipe" SET "delete_at" = now()
  WHERE id = $1
  AND delete_at IS NULL
  RETURNING *       
$$ LANGUAGE sql;


--  ---------------------------------------- History table -------------------------------------------------------

CREATE TABLE IF NOT EXISTS "history"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" int REFERENCES "user"("id") NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "delete_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "history_has_recipe"(
  "id"  int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "validate" boolean NOT NULL DEFAULT 'false',
  "history_id" int REFERENCES "history"("id") NOT NULL,
  "recipe_id" int REFERENCES "recipe"("id") NOT NULL
);

--  ---------------------------------------- History type -------------------------------------------------------

CREATE TYPE history_with_recipe AS (
	"id" int,
  "userId" int,
  "date" TIMESTAMPTZ,
  "recipes" json
);

--  ---------------------------------------- History function -------------------------------------------------------

CREATE FUNCTION get_history(INT) RETURNS SETOF "history_with_recipe" AS $$
  SELECT h."id",h."user_id",h."created_at",COALESCE(JSON_AGG(r.*) FILTER (WHERE r.* IS NOT NULL), '[]') AS recipes FROM "history" AS h
  LEFT JOIN "history_has_recipe" AS hhr
  ON h."id" = hhr."history_id"
  LEFT JOIN "recipe" AS r
  ON hhr."recipe_id" = r."id"
  WHERE h."user_id" = $1
  GROUP BY h."id",h."user_id",h."created_at"
  ORDER BY h."created_at" DESC
$$ LANGUAGE SQL;

CREATE FUNCTION create_history(json) RETURNS "history" AS $$
	INSERT INTO "history"
  ("user_id") VALUES (($1->>'userId')::int)
	RETURNING * 	
$$ LANGUAGE sql;

CREATE FUNCTION delete_history(INT) RETURNS "history" AS $$
	UPDATE "history" SET "delete_at"= now()
  WHERE "id" = $1
  AND "delete_at" IS NULL
	RETURNING * 		
$$ LANGUAGE sql;

CREATE FUNCTION get_valid_recipe_history(INT) RETURNS SETOF "history_with_recipe" AS $$
	SELECT h."id",h."user_id",h."created_at",COALESCE(JSON_AGG(r.*) FILTER (WHERE r.* IS NOT NULL), '[]') AS recipes FROM "history" AS h
  LEFT JOIN "history_has_recipe" AS hhr
  ON h."id" = hhr."history_id"
  LEFT JOIN "recipe" AS r
  ON hhr."recipe_id" = r."id"
  WHERE h."user_id" = $1
  AND hhr."validate" IS TRUE
  GROUP BY h."id",h."user_id",h."created_at"
  ORDER BY h."created_at" DESC	
$$ LANGUAGE sql;

CREATE FUNCTION add_recipe_to_history(json) RETURNS "history_has_recipe" AS $$
	INSERT INTO "history_has_recipe"(
    "validate",
    "history_id",
    "recipe_id"
  ) VALUES (
    COALESCE(($1->>'validate')::boolean, false),
    ($1->>'historyId')::int,
    ($1->>'recipeId')::int
  )
	RETURNING *
$$ LANGUAGE sql;


CREATE FUNCTION update_recipe_to_history(json) RETURNS "history_has_recipe" AS $$
	UPDATE "history_has_recipe" SET "validate" = ($1->>'validate')::boolean
  WHERE "history_id" = ($1->>'historyId')::int
  AND "recipe_id" = ($1->>'recipeId')::int
	RETURNING * 
$$ LANGUAGE sql;


CREATE FUNCTION remove_recipe_to_history(json) RETURNS "history_has_recipe" AS $$
	DELETE FROM "history_has_recipe"
  WHERE "history_id" = ($1->>'historyId')::int
  AND "recipe_id" = ($1->>'recipeId')::int
	RETURNING * 
$$ LANGUAGE sql;

COMMIT;
