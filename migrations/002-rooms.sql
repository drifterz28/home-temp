-- Up
CREATE TABLE rooms (ip TEXT, name TEXT)
INSERT INTO rooms (ip, name) VALUES ('::1', 'living');
-- Down
DROP TABLE rooms
