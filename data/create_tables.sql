BEGIN;
DROP FUNCTION IF EXISTS
  create_user(json), find_user(), find_user(int), update_user(json), delete_user(json),
  create_user_key(json), find_user_key(json), delete_user_key(json),
  get_history(int), create_history(), update_history(), delete_history(),
  get_recipe_history();

DROP TABLE IF EXISTS "user", "user_key", "history" CASCADE;


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



COMMIT;