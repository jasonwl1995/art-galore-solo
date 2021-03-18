
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "picture" VARCHAR (255) NOT NULL,
    "user_intro" VARCHAR (1000),
    "address" VARCHAR (255),
    "city" VARCHAR (255),
    "state" VARCHAR (255),
    "zip" INT,
);

CREATE TABLE "artwork" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "title" VARCHAR (255) NOT NULL,
    "date" DATE NOT NULL, 
    "image" VARCHAR (255) NOT NULL,
    "description" VARCHAR (1000) NOT NULL,
    "category_id" INT REFERENCES "category"
);

CREATE TABLE "like_log" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "artwork_id" INT REFERENCES "artwork"
);

CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "theme" VARCHAR (255)
);