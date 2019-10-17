-- schema

DROP DATABASE IF EXISTS desk;

CREATE DATABASE desk;

USE desk;

CREATE TABLE diary
(
	id INT NOT NULL AUTO_INCREMENT,
	requestID INT (15) NULL,
    entryType VARCHAR (64) NULL,
    diaryText VARCHAR (5000) NULL,
    time INT NULL,
    PRIMARY KEY (id)
);

USE desk;

CREATE TABLE requests
(
	id INT NOT NULL AUTO_INCREMENT,
	slackID VARCHAR (45) NULL,
    requester VARCHAR (128) NULL,
    initialDescription VARCHAR (5000) NULL,
    requestClass VARCHAR (64)
    -- date,
    owner VARCHAR (128) NULL,
    procStatus VARCHAR (10) NULL,
    procID INT (20) NULL,
    archive BOOL NULL,
    time INT NULL,
    PRIMARY KEY (id)
);

USE desk;

CREATE TABLE user
(
	id INT NOT NULL AUTO_INCREMENT,
	slackID VARCHAR (45) NULL,
    name VARCHAR (128) NULL,
    phone INT (10) NULL,
    email VARCHAR (128) NULL,
    customer BOOL,
    operator BOOL,
    other INT,
    time INT NULL,
    PRIMARY KEY (id)
);

-- join diary on requests.id = dairy.requestID;