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
    role role_enum NOT NULL
);

-- Table Followed (relation many-to-many entre les utilisateurs)
CREATE TABLE "Followed" (
    follower_id INT NOT NULL,
    followed_id INT NOT NULL,
    PRIMARY KEY (follower_id, followed_id),
    FOREIGN KEY (follower_id) REFERENCES "Users"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (followed_id) REFERENCES "Users"(user_id) ON DELETE CASCADE
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
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Insertion des utilisateurs
INSERT INTO Users (name, email, password, race, role) VALUES
('Alice', 'alice@example.com', 'Arnaud123!', 'SORCIER', 'member'),
('Bob', 'bob@example.com', 'Arnaud123!', 'GUERRIER', 'member'),
('Charlie', 'charlie@example.com', 'Arnaud123!', 'ESPION', 'member'),
('Diana', 'diana@example.com', 'Arnaud123!', 'ALCHIMISTE', 'member'),
('Eve', 'eve@example.com', 'Arnaud123!', 'ENCHANTEUR', 'member');

-- Insertion des jeux
INSERT INTO Games (nameGame) VALUES
('ShiFuMi'),

-- Insertion des scores
INSERT INTO Scores (victories, defeats, points, game_id, user_id) VALUES
(10, 5, 100, 1, 1),
(15, 3, 150, 1, 2),
(7, 8, 70, 1, 3),
(20, 2, 200, 1, 4),
(5, 10, 50, 1, 5);

-- Insertion des relations Followed
INSERT INTO Followed (follower_id, followed_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(3, 2),
(3, 5),
(4, 1),
(5, 4);
