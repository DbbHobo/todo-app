CREATE DATABASE TODO;

create table todos(
   id INT UNSIGNED AUTO_INCREMENT,
   user_email VARCHAR(255),
   title VARCHAR(30),
   progress INT,
   create_date DATE,
   PRIMARY KEY (id)
);

create table users (
  email VARCHAR(255),
  hashed_password VARCHAR(255),
  PRIMARY KEY (email)
);

INSERT INTO todos (id,user_email,title,progress,create_date) VALUES (0,"xxx@xxx.com","First TODO",23,"2023-07-10");