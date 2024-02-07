BEGIN;
DROP FUNCTION IF EXISTS
  create_user(json), find_user(), find_user(int), update_user(json), delete_user(json),
  create_user_key(json), find_user_key(json), delete_user_key(json),
  get_history(int), create_history(), update_history(), delete_history(),
  get_recipe_history(),
  create_family(json), find_family(), find_family(int), update_family(json), delete_family(int),
  create_recipe(json), find_recipe(), find_recipe(int), update_recipe(json), delete_recipe(json);

DROP TABLE IF EXISTS "user", "user_key", "history", "family", "recipe" CASCADE;


CREATE TABLE IF NOT EXISTS "user"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "active" boolean NOT NULL DEFAULT false,
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

CREATE FUNCTION create_user(json) RETURNS "user" AS $$
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
	RETURNING * 	
$$ LANGUAGE sql;

CREATE FUNCTION find_user() RETURNS SETOF "user" AS $$
	SELECT * FROM "user"
  WHERE "delete_at" IS NULL
$$ LANGUAGE sql;

CREATE FUNCTION find_user(int) RETURNS "user" AS $$
	SELECT * FROM "user"
  WHERE "id"=$1
  AND "delete_at" IS NULL
$$ LANGUAGE sql;

CREATE FUNCTION update_user(json) RETURNS "user" AS $$
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
	RETURNING * 	
$$ LANGUAGE sql;

CREATE FUNCTION delete_user(json) RETURNS "user" AS $$
	UPDATE "user" SET "delete_at"	= now()
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING * 		
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

/* A COMPLETER, PAS TOTALEMENT SUR QU'ELLE SOIT TERMINEE */
CREATE TABLE IF NOT EXISTS "history"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "user_id" int REFERENCES "user"("id") NOT NULL,
  "delete_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "recipe_has_history"(
  "id"  int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "validate" boolean NOT NULL, DEFAULT 'false',
  "history_id" int REFERENCES "history"("id") NOT NULL,
  "recipe_id" int REFERENCES "recipe"("id") NOT NULL,
);

CREATE FUNCTION get_history(INT) RETURNS SETOF "user" AS $$
  SELECT * FROM "history"
  WHERE "user_id" = $1
$$ LANGUAGE SQL;

CREATE FUNCTION update_history (json) RETURNS "history" AS $$
	UPDATE "history" SET (
  "updated_at"
  
	)
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING * 	
$$ LANGUAGE sql;

CREATE FUNCTION create_history (json) RETURNS "history" AS $$
	INSERT INTO "history"  (
    "user_id"
    "created_at" TIMESTAMPTZ ,
    "updated_at" TIMESTAMPTZ,
	)
  VALUES (
    ($1->>'user_id')::int
  )
	RETURNING * 	
$$ LANGUAGE sql;


CREATE FUNCTION delete_history() RETURNS "history" AS $$
	UPDATE "history" SET "delete_at"	= now()
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
	RETURNING * 		
$$ LANGUAGE sql;


CREATE FUNCTION get_recipe_history(
    _recipe_id INT
) RETURNS TABLE (
    id INT,
    validate BOOLEAN,
    history_id INT
) AS $$
BEGIN
    RETURN QUERY 
    SELECT id, validate, history_id 
    FROM recipe_has_history 
    WHERE recipe_id = _recipe_id;
END;
$$ LANGUAGE SQL;






-- Creation of the "family" table
CREATE TABLE IF NOT EXISTS "family" (
  "id" INT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Function to create a family
CREATE FUNCTION create_family(json) RETURNS "family" AS $$
  INSERT INTO "family" ("id", "name")
  VALUES (
    ($1->>'id')::INT,
    ($1->>'name')::TEXT
  )
  RETURNING *;
$$ LANGUAGE SQL;

-- Function to find all families
CREATE FUNCTION find_family() RETURNS SETOF "family" AS $$
  SELECT * FROM "family";
$$ LANGUAGE SQL;

-- Function to find a family by ID
CREATE FUNCTION find_family(INT) RETURNS "family" AS $$
  SELECT * FROM "family"
  WHERE "id" = $1;
$$ LANGUAGE SQL;

-- Function to update a family
CREATE FUNCTION update_family(json) RETURNS "family" AS $$
  UPDATE "family" SET
    "name" = COALESCE(($1->>'name')::TEXT, "name"),
    "updated_at" = NOW()
  WHERE "id" = ($1->>'id')::INT
  RETURNING *;
$$ LANGUAGE SQL;

-- Function to delete a family
CREATE FUNCTION delete_family(INT) RETURNS "family" AS $$
  DELETE FROM "family"
  WHERE "id" = $1
  RETURNING *;
$$ LANGUAGE SQL;






-- Create the "recipe" table
CREATE TABLE IF NOT EXISTS "recipe"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "image" TEXT,
  "hunger" TEXT NOT NULL DEFAULT 'normal',
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "preparating_time" INT NOT NULL,
  "user_id" INT NOT NULL REFERENCES "user"(id),
  "delete_at" TIMESTAMPTZ
);

-- Create the create_recipe function
CREATE FUNCTION create_recipe(json) RETURNS "recipe" AS $$
  INSERT INTO "recipe" (
    "name",
    "image",
    "hunger",
    "preparating_time",
    "user_id"
  )
  VALUES (
    ($1->>'name')::text,
    ($1->>'image')::text,
    COALESCE(($1->>'hunger')::text, 'normal'),
    ($1->>'preparating_time')::int,
    ($1->>'user_id')::int
  )
  RETURNING *   
$$ LANGUAGE sql;

-- Create the find_recipe function without parameters
CREATE FUNCTION find_recipe() RETURNS SETOF "recipe" AS $$
  SELECT * FROM "recipe"
  WHERE "delete_at" IS NULL
$$ LANGUAGE sql;

-- Create the find_recipe function with an integer parameter
CREATE FUNCTION find_recipe(int) RETURNS "recipe" AS $$
  SELECT * FROM "recipe"
  WHERE "id"=$1
  AND "delete_at" IS NULL
$$ LANGUAGE sql;

-- Create the update_recipe function
CREATE FUNCTION update_recipe(json) RETURNS "recipe" AS $$
  UPDATE "recipe" SET (
    "name",
    "image",
    "hunger",
    "preparating_time",
    "updated_at"
  )
  = (
    COALESCE(($1->>'name')::text, "name"),
    COALESCE(($1->>'image')::text, "image"),
    COALESCE(($1->>'hunger')::text, "hunger"),
    COALESCE(($1->>'preparating_time')::int, "preparating_time"),
    now()
  )
  WHERE "id" = ($1->>'id')::int
  AND "delete_at" IS NULL
  RETURNING *   
$$ LANGUAGE sql;

-- Create the delete_recipe function
CREATE FUNCTION delete_recipe(json) RETURNS "recipe" AS $$
  UPDATE "recipe" SET "delete_at" = now()
  WHERE id = ($1->>'id')::int
  AND delete_at IS NULL
  RETURNING *       
$$ LANGUAGE sql;


COMMIT;
