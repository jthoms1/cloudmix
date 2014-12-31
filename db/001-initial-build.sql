DROP SCHEMA IF EXISTS "cloudmix" CASCADE;
CREATE SCHEMA "cloudmix";

DROP TABLE IF EXISTS "cloudmix"."user";
CREATE TABLE "cloudmix"."user" (
  "id" SERIAL,
  "email" VARCHAR(127) NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id")
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

DROP TABLE IF EXISTS "cloudmix"."track";
CREATE TABLE "cloudmix"."track" (
  "id" SERIAL,
  "song_id" INTEGER NOT NULL,
  "index" INTEGER NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("playlist_id") REFERENCES "cloudmix"."playlist" ("id")
);

DROP TABLE IF EXISTS "cloudmix"."tag";
CREATE TABLE "cloudmix"."tag" (
  "id" SERIAL,
  "name" VARCHAR(127),
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "cloudmix"."tracktag";
CREATE TABLE "cloudmix"."tracktag" (
  "id" SERIAL,
  "track_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  "created_at" TIMESTAMP,
  "updated_at" TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("track_id") REFERENCES "cloudmix"."track" ("id"),
  FOREIGN KEY ("tag_id") REFERENCES "cloudmix"."tag" ("id")
);

DROP TABLE IF EXISTS "cloudmix"."schemaupgrade";
CREATE TABLE "cloudmix"."schemaupgrade" (
  "time" TIMESTAMP,
  "scriptfilename" VARCHAR(255),
  "scriptfilehash" CHAR(40)
);

