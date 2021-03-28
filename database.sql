DROP TABLE "user";
DROP TABLE "artwork";
DROP TABLE "like_log";
DROP TABLE "category";
--DROP TABLE "artwork_category";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "pfp" VARCHAR (255),
    "intro" VARCHAR (1000),
    "address" VARCHAR (255),
    "city" VARCHAR (255),
    "state" VARCHAR (255),
    "zip" INT
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
    "theme" VARCHAR (255) NOT NULL
);

--CREATE TABLE "artwork_category" (
--  "id" SERIAL PRIMARY KEY,
--  "artwork_id" INT REFERENCES "artwork" NOT NULL,
--  "category_id" INT REFERENCES "category" NOT NULL
--);



INSERT INTO "category" ("theme")
VALUES
('Abstract'), ('Animals and Wildlife'), ('Anime and Manga'), ('Architechtural'), ('Automotive');
-- ('Abstract'), ('Abstract'), ('Abstract'), ('Abstract'), ('Abstract'),
-- ('Abstract'), ('Abstract'), ('Abstract'), ('Abstract'), ('Abstract'), 
-- ('Abstract'), ('Abstract'), ('Abstract'), ('Abstract'), ('Abstract'), 

--SELECT id, username, intro, address, city, state, zip, (SELECT COUNT(1) FROM artwork WHERE artwork.user_id = "user".id) AS artwork_count FROM "user"
--ORDER BY username ASC

                      
                      
