
-- Création de type ENUM pour race
CREATE TYPE race_enum AS ENUM ('SORCIER', 'GUERRIER', 'ESPION', 'ALCHIMISTE', 'ENCHANTEUR');

-- Création de type ENUM pour role
CREATE TYPE role_enum AS ENUM ('member', 'admin');

-- Table des utilisateurs avec ENUMs
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    race race_enum NOT NULL,
    role role_enum NOT NULL,
    date_creation DATE NOT NULL
);

-- Table des amis (relation many-to-many entre les utilisateurs)
CREATE TABLE Followeds (
    user_id INT NOT NULL,
    followed_id INT NOT NULL,
    PRIMARY KEY (user_id, followed_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Table des jeux
CREATE TABLE Games (
    game_id SERIAL PRIMARY KEY,
    nameGame VARCHAR(100) NOT NULL
);

-- Table des scores
CREATE TABLE Scores (
    score_id SERIAL PRIMARY KEY,
    victories INT NOT NULL,
    defeats INT NOT NULL,
    points INT NOT NULL,
    game_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (game_id) REFERENCES Game(game_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
