DROP DATABASE IF EXISTS authentication;
CREATE DATABASE authentication;
USE authentication;

-- create the user table
CREATE TABLE user (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  keystroke_per_second DOUBLE NOT NULL,
  average_flight_time DOUBLE NOT NULL,
  average_dwell_time DOUBLE NOT NULL,
  PRIMARY KEY (id)
);

-- insert a user record
INSERT INTO user (username, password, keystroke_per_second, average_flight_time, average_dwell_time) VALUES ('asdf', 'asdf', 3.8, 250, 96);