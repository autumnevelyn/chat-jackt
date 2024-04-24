-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id)
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
	id SERIAL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('private_message', 'group_chat')),
    title VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY(id)
);

-- Create relationship between users and conversations
CREATE TABLE IF NOT EXISTS is_member(
	conversation_id INT REFERENCES conversations(id) NOT NULL,
	user_id INT REFERENCES users(id) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	PRIMARY KEY (conversation_id, user_id)
);

CREATE OR REPLACE FUNCTION sender_is_member(message_conversation_id INT, sender_id INT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if there exists a row in the is_member table for the combination of conversation_id and owner_id
    RETURN EXISTS (
        SELECT 1
        FROM is_member
        WHERE conversation_id = message_conversation_id
        AND user_id = sender_id
    );
END;
$$ LANGUAGE plpgsql;

-- Create Messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL,
    sender_id INT REFERENCES users(id) NOT NULL,
    conversation_id INT REFERENCES conversations(id) NOT NULL,
    content VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT check_sender_is_member CHECK (sender_is_member(conversation_id, sender_id)),
    PRIMARY KEY(id)
);

-- Enable crypting functions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION hash_password()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the NEW row contains a password
    IF NEW.password IS NOT NULL THEN
        -- Hash the password using crypt() function with a random salt
        NEW.password := crypt(NEW.password, gen_salt('bf'));
    END IF;
    -- Return the NEW row
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hash_password_trigger
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION hash_password();


-- Insert test data
INSERT INTO users (username, password) VALUES ('test_user1', 'password123');
INSERT INTO users (username, password) VALUES ('test_user2', 'password321');
INSERT INTO users (username, password) VALUES ('test_user3', 'password456');

INSERT INTO conversations(type, title) VALUES ('private_message', 'test private chat');
INSERT INTO conversations(type, title) VALUES ('group_chat', 'test group chat');

INSERT INTO is_member(conversation_id, user_id) VALUES ((SELECT id FROM conversations WHERE title = 'test private chat'), (SELECT id FROM users WHERE username = 'test_user1'));
INSERT INTO is_member(conversation_id, user_id) VALUES ((SELECT id FROM conversations WHERE title = 'test private chat'), (SELECT id FROM users WHERE username = 'test_user2'));
INSERT INTO is_member(conversation_id, user_id) VALUES ((SELECT id FROM conversations WHERE title = 'test group chat'), (SELECT id FROM users WHERE username = 'test_user1'));
INSERT INTO is_member(conversation_id, user_id) VALUES ((SELECT id FROM conversations WHERE title = 'test group chat'), (SELECT id FROM users WHERE username = 'test_user2'));
INSERT INTO is_member(conversation_id, user_id) VALUES ((SELECT id FROM conversations WHERE title = 'test group chat'), (SELECT id FROM users WHERE username = 'test_user3'));

INSERT INTO messages (sender_id, conversation_id, content) VALUES (
    (SELECT id FROM users WHERE username = 'test_user1'), (SELECT id FROM conversations WHERE title = 'test private chat'),'Hehe, this is a test message :)');
INSERT INTO messages (sender_id, conversation_id, content) VALUES (
    (SELECT id FROM users WHERE username = 'test_user2'), (SELECT id FROM conversations WHERE title = 'test private chat'),'hey there, so good to see you');
INSERT INTO messages (sender_id, conversation_id, content) VALUES (
    (SELECT id FROM users WHERE username = 'test_user3'), (SELECT id FROM conversations WHERE title = 'test group chat'),'hello world!');

   
   
   
-- Quick commands

-- ALTER TABLE messages ADD CONSTRAINT different_sender_recipient CHECK (sender_id <> recipient_id);
-- ALTER TABLE messages ALTER COLUMN sender_id SET NOT NULL, ALTER COLUMN recipient_id SET NOT NULL;

-- DELETE FROM messages;
-- DELETE FROM users;
-- ALTER TABLE users RENAME COLUMN password_hash TO password;
   
-- Create conversations table with owner
--CREATE OR REPLACE FUNCTION owner_is_member(conversation_id_param INT, owner_id INT)
--RETURNS BOOLEAN AS $$
--BEGIN
--    -- Check if there exists a row in the is_member table for the combination of conversation_id and owner_id
--    RETURN EXISTS (
--        SELECT 1
--        FROM is_member
--        WHERE conversation_id = conversation_id_param
--        AND user_id = owner_id
--    );
--END;
--$$ LANGUAGE plpgsql;
--CREATE TABLE IF NOT EXISTS conversations (
--	id SERIAL,
--    type VARCHAR(20) NOT NULL CHECK (type IN ('private_message', 'group_chat')),
--    title VARCHAR(20),
--	owner_id INT REFERENCES users(id),
--    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--    
--    CONSTRAINT check_group_chat_has_owner CHECK ( 
--    	((type = 'group_chat') AND owner_id IS NOT NULL) OR
--    	((type = 'private_message') AND owner_id IS NULL)
--   	),
--   	CONSTRAINT check_owner_is_member CHECK (
--        (type = 'group_chat' AND owner_is_member(id, owner_id) OR (type = 'private_message'))
--     ),
--    PRIMARY KEY(id)
--);
