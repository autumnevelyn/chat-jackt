-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- Enable crypting functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create Messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL,
    sender_id INT REFERENCES users(id) NOT NULL,
    recipient_id INT REFERENCES users(id) NOT NULL,
    content VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT different_sender_recipient CHECK (sender_id <> recipient_id),
    PRIMARY KEY(id)
);

-- Insert test data
INSERT INTO users (username, password_hash) VALUES ('test_user1', crypt('password123', gen_salt('bf')));
INSERT INTO users (username, password_hash) VALUES ('test_user2', crypt('password321', gen_salt('bf')));
INSERT INTO messages (sender_id, recipient_id, content) VALUES (
    (SELECT id FROM users WHERE username = 'test_user1'), (SELECT id FROM users WHERE username = 'test_user2'),'Hehe, this is a test message :)');
INSERT INTO messages (sender_id, recipient_id, content) VALUES (
    (SELECT id FROM users WHERE username = 'test_user2'), (SELECT id FROM users WHERE username = 'test_user1'),'Hello, such a nice test message :)');


-- Quick commands

-- ALTER TABLE messages ADD CONSTRAINT different_sender_recipient CHECK (sender_id <> recipient_id);
-- DELETE FROM messages;
-- ALTER TABLE messages 
-- ALTER COLUMN sender_id SET NOT NULL,
-- ALTER COLUMN recipient_id SET NOT NULL;

-- DELETE FROM messages;
-- DELETE FROM users;