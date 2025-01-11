\c postgres;

DROP DATABASE IF EXISTS profile_db;
CREATE DATABASE profile_db;

\c profile_db;

CREATE TABLE users ( 
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(300) NOT NULL
);

CREATE TABLE characters (
    char_id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    class_id INT NOT NULL,
    id INT NOT NULL REFERENCES users(id)
);
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