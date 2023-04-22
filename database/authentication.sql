CREATE DATABASE authentication;
USE authentication;

-- create the user table
CREATE TABLE user (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- create the keystroke dynamic data table
CREATE TABLE keystroke_data (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  keystroke_time FLOAT NOT NULL,
  key_code VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- insert a user record
INSERT INTO user (username, password) VALUES ('john_doe', 'mypassword123');

-- get the ID of the newly inserted user record
SET @user_id = LAST_INSERT_ID();

-- insert keystroke dynamic data for the user
INSERT INTO keystroke_data (user_id, keystroke_time, key_code) VALUES
(@user_id, 1.23, 'A'),
(@user_id, 1.45, 'B'),
(@user_id, 1.67, 'C');