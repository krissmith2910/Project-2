--seeds-- 

--diary--

INSERT INTO diary (requestID, entryType, diaryText, priority, time) VALUES (15134, "Test entry", "Testing our help desk diary table", 1571275888);

--requests--

INSERT INTO requests (slackID, requester, initialDescription, requestClass, owner, procStatus, procID, archive, time) VALUES ("2Pac_4Ever", 15134, "Testing our help desk diary table", "connections","IrvGotti", "open", 343, 15712767478);

--user--

INSERT INTO user (slackID, name, phone, email, customer, operator, other, time) VALUES ("2Pac_4Ever", "Tupac Shakur", 18015559999, "WhenWeRide@Gmail.com", true, false, 15712769754);