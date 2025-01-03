DROP DATABASE IF EXISTS profile_db;
CREATE DATABASE profile_db;

/c profile_db;

CREATE TABLE character (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    class_id Integer NOT NULL
);

CREATE TABLE stats (
    strength INTEGER NOT NULL,
    dexterity INTEGER NOT NULL,
    constitution INTEGER NOT NULL,
    intelligence INTEGER NOT NULL,
    wisdom INTEGER NOT NULL,
    charisma INTEGER NOT NULL
);

CREATE TABLE spells (
    id SERIAL PRIMARY KEY,
    ability_name VARCHAR(30) NOT NULL,
    description VARCHAR(100) NOT NULL
);