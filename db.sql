CREATE TABLE products (
	id INT,
	name VARCHAR(50),
	price INT,
	on_sale BOOLEAN
);

ALTER TABLE products ADD COLUMN featured boolean;

ALTER TABLE products DROP COLUMN featured;

CREATE TABLE restaurants (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	location VARCHAR (50) NOT NULL,
	price_range INT NOT NULL check(price_range >=1 and price_range <=5)
);
alter table restaurants add creator UUID NOT NULL default '7a9eaf29-f89d-41f0-9e14-92b4e03e736f' REFERENCES users(user_id);


INSERT INTO restaurants(name, location, price_range) values ('wendys', 'miami', 4);

select * from restaurants where id = 1;

insert into restaurants (name, location, price_range) values ('wendys', 'new york', 4);

UPDATE restaurants SET name = 'red lobster', location = 'miami', price_range = 2 where id = 8;/


DELETE FROM restaurants where id = 8;

CREATE TABLE reviews (
id BIGSERIAL NOT NULL PRIMARY KEY,
restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
name VARCHAR(50) NOT NULL,
review TEXT NOT NULL,
rating INT NOT NULL CHECK(rating >=1 and rating <=5)
);

select trunc(avg(rating), 2) AS average_rating from reviews where restaurant_id=9;

select count(rating) from reviews where restaurant_id=9;

select location, count(location) FROM restaurants group by location;

select restaurant_id, count(restaurant_id) from reviews group by restaurant_id;

select * from restaurants inner join reviews on restaurants.id = reviews.restaurant_id;

select * from restaurants left join reviews on restaurants.id = reviews.restaurant_id;

select * from restaurants right join reviews on restaurants.id = reviews.restaurant_id;

select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;

select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where restaurant_id=9;






-- create extension if not exists "uuid-ossp";
CREATE TABLE users(
user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(225) NOT NULL,
user_password VARCHAR(255) NOT NULL
);

insert into users (user_name, user_email, user_password) values ('henry', 'henryly213@gmail.com','kth18822');