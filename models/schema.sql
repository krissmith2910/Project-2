-- schema

DROP DATABASE IF EXISTS desk;

CREATE DATABASE desk;

USE desk;

CREATE TABLE diary
(
	id INT NOT NULL AUTO_INCREMENT,
    diaryID INT (45) NOT NULL,
	requestID INT (15) NOT NULL,
    entryType VARCHAR (64) NOT NULL,
    diaryText TEXT (288) NOT NULL,
    priority VARCHAR (10) NOT NULL,
    time INT NOT NULL,
    PRIMARY KEY (id)
);

USE desk;

CREATE TABLE requests
(
	id INT NOT NULL AUTO_INCREMENT,
    requestID INT (45) NOT NULL,
	slackID VARCHAR (45) NOT NULL,
    requester VARCHAR (128) NOT NULL,
    initialDescription VARCHAR (288) NOT NULL,
    requestClass VARCHAR (64) NOT NULL,
    reqDate INT NOT NULL,
    owner VARCHAR (128) NOT NULL,
    procStatus VARCHAR (10) NOT NULL,
    procID INT (20) NOT NULL,
    archive BOOL NOT NULL,
    time INT NOT NULL,
    PRIMARY KEY (id)
);

USE desk;

CREATE TABLE user
(
	id INT NOT NULL AUTO_INCREMENT,
	slackID VARCHAR (45) NOT NULL,
    name VARCHAR (128) NOT NULL,
    phone INT (10) NOT NULL,
    email VARCHAR (128) NOT NULL,
    customer BOOL,
    operator BOOL,
    other INT,
    time INT NOT NULL,
    PRIMARY KEY (id)
);
