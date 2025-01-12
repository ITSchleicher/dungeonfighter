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
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE, -- Deletes character if user is deleted
    char_name VARCHAR(255) NOT NULL,
    class_level VARCHAR(255) NOT NULL,
    background VARCHAR(255) NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    race VARCHAR(255) NOT NULL,
    alignment VARCHAR(255) NOT NULL,
    experience_points INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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