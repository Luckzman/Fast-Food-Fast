DROP DATABASE IF EXISTS db_fastfoodfast;
CREATE DATABASE db_fastfoodfast;

\c db_fastfoodfast;

CREATE TYPE order_status AS ENUM ('new', 'processing', 'cancelled', 'complete');
CREATE TYPE user_status AS ENUM ('regular', 'admin');
CREATE TYPE state AS ENUM ('lagos', 'abuja', 'portharcourt');

CREATE TABLE users(
    id UUID PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    image VARCHAR DEFAULT '',
    user_status user_status DEFAULT 'regular',
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ
);
CREATE TABLE users_address(
    id UUID PRIMARY KEY,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state state NOT NULL,
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE
);
CREATE TABLE food_menus(
    id UUID PRIMARY KEY,
    food_name VARCHAR NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category VARCHAR NOT NULL,
    price VARCHAR NOT NULL,
    image VARCHAR,
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ
);
CREATE TABLE orders(
    id UUID PRIMARY KEY,
    cart JSON[],
    additional_info VARCHAR, 
    -- cart content contains array of json object of food_name and quantity
    order_status order_status DEFAULT 'new',
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE
);