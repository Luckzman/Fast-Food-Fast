DROP DATABASE IF EXISTS db_fastfoodfast;
CREATE DATABASE db_fastfoodfast;

\c db_fastfoodfast;

CREATE TABLE users(
    id UUID PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    user_status VARCHAR DEFAULT 'regular',
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ
);

CREATE TABLE orders(
    id UUID PRIMARY KEY,
    quantity_ordered INT NOT NULL,
    order_status VARCHAR DEFAULT 'pending',
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ,
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE food_menus(
    id UUID PRIMARY KEY,
    food_name VARCHAR NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR NOT NULL,
    price VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ
);

