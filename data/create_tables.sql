BEGIN;
DROP FUNCTION IF EXISTS create_user(json), find_user(), find_user(int), update_user(json), delete_user(json);
DROP TABLE IF EXISTS "user";

CREATE TABLE IF NOT EXISTS "user"(
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "delete_at" TIMESTAMPTZ
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
$$ LANGUAGE sql;

CREATE FUNCTION find_user(int) RETURNS "user" AS $$
	SELECT * FROM "user"
  WHERE "id"=$1
$$ LANGUAGE sql;

CREATE FUNCTION update_user(json) RETURNS "user" AS $$
	UPDATE "user" SET (
	  "name",
  	"email",
  	"password",
    "updated_at"
	)
	= (
  	COALESCE(($1->>'name')::text, "name"),
    COALESCE(($1->>'email')::text, "email"),
	  COALESCE(($1->>'password')::text, "password"),
    now()
	)
  WHERE "id" = ($1->>'id')::int
	RETURNING * 	
$$ LANGUAGE sql;

CREATE FUNCTION delete_user(json) RETURNS "user" AS $$
	UPDATE "user" SET "delete_at"	= now()
  WHERE "id" = ($1->>'id')::int
	RETURNING * 		
$$ LANGUAGE sql;

COMMIT;