CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employee VALUES
    (1, 'Joue', 1000),
    (2, 'Henry', 4000),
    (3, 'Sam', 2000),
    (4, 'Redd', 3000);

