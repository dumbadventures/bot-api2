-- not really necessary for MySQL but nice to know what I'm working with

-- CREATE DATABASE notes_app;
-- USE notes_app;

-- CREATE TABLE notes (
--   id integer PRIMARY KEY AUTO_INCREMENT,
--   title VARCHAR(255) NOT NULL,
--   contents TEXT NOT NULL,
--   created TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- INSERT INTO notes (title, contents)
-- VALUES 
-- ('My First Note', 'A note about something'),
-- ('My Second Note', 'A note about something else');

CREATE DATABASE discord_api;
USE discord_api;

CREATE TABLE users (
  user_id varchar(20) NOT NULL,
  server_id varchar(20) NOT NULL,
  pronouns varchar(255) NOT NULL
);

