-- seeds

-- diary

INSERT INTO diary (requestID, entryType, diaryText, time) VALUES (15134, "Test entry", "Testing our help desk diary table", 1571275888);

-- requests

INSERT INTO requests (slackID, requester, initialDescription, requestClass, operator, procStatus, procID, archive, time) VALUES ("2Pac_4Ever", 15134, "Testing our help desk diary table", "connections","IrvGotti", "open", 343, false, 1571276747);

-- user

INSERT INTO user (slackID, name, email, customer, operator, time) VALUES ("2Pac_4Ever", "Tupac Shakur", "WhenWeRide@Gmail.com", true, false, 1571276975);