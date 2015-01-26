DROP SCHEMA IF EXISTS "cloudmix" CASCADE;
CREATE SCHEMA "cloudmix";

DROP TABLE IF EXISTS "cloudmix"."artist";
CREATE TABLE "cloudmix"."artist" (
  "id" SERIAL,
  "name" VARCHAR(127) NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE ("name")
);

DROP TABLE IF EXISTS "cloudmix"."album";
CREATE TABLE "cloudmix"."album" (
  "id" SERIAL,
  "name" VARCHAR(127) NOT NULL,
  "year" TIMESTAMP,
  "artist_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("artist_id") REFERENCES "cloudmix"."artist" ("id")
);

DROP TABLE IF EXISTS "cloudmix"."song";
CREATE TABLE "cloudmix"."song" (
  "id" SERIAL,
  "name" VARCHAR(127) NOT NULL,
  "duration" INTERVAL,
  "album_order" INTEGER NOT NULL,
  "artist_id" INTEGER NOT NULL,
  "album_id" INTEGER NOT NULL,
  "explicit" BOOLEAN,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("artist_id") REFERENCES "cloudmix"."artist" ("id"),
  FOREIGN KEY ("album_id") REFERENCES "cloudmix"."album" ("id")
);


DROP TABLE IF EXISTS "cloudmix"."user";
CREATE TABLE "cloudmix"."user" (
  "id" SERIAL,
  "email" VARCHAR(127) NOT NULL,
  "password" VARCHAR(60) NOT NULL,
  "display_name" VARCHAR(127) NOT NULL,
  "real_name" VARCHAR(127) NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE ("email"),
  UNIQUE ("display_name")
);

DROP TABLE IF EXISTS "cloudmix"."playlist";
CREATE TABLE "cloudmix"."playlist" (
  "id" SERIAL,
  "title" VARCHAR(127),
  "description" TEXT,
  "user_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("user_id") REFERENCES "cloudmix"."user" ("id")
);

DROP TABLE IF EXISTS "cloudmix"."playlist_song";
CREATE TABLE "cloudmix"."playlist_song" (
  "id" SERIAL,
  "playlist_id" INTEGER NOT NULL,
  "song_id" INTEGER NOT NULL,
  "playlist_order" INTEGER NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("playlist_id") REFERENCES "cloudmix"."playlist" ("id"),
  FOREIGN KEY ("song_id") REFERENCES "cloudmix"."song" ("id")
);

DROP TABLE IF EXISTS "cloudmix"."tag";
CREATE TABLE "cloudmix"."tag" (
  "id" SERIAL,
  "name" VARCHAR(127),
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE ("name")
);

DROP TABLE IF EXISTS "cloudmix"."song_tag";
CREATE TABLE "cloudmix"."song_tag" (
  "id" SERIAL,
  "song_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("song_id") REFERENCES "cloudmix"."song" ("id"),
  FOREIGN KEY ("tag_id") REFERENCES "cloudmix"."tag" ("id")
);

DROP TABLE IF EXISTS "cloudmix"."schemaupgrade";
CREATE TABLE "cloudmix"."schemaupgrade" (
  "time" TIMESTAMP,
  "scriptfilename" VARCHAR(255),
  "scriptfilehash" CHAR(40)
);

