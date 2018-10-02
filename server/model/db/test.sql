CREATE TYPE order_status AS ENUM ('new', 'processing', 'cancelled', 'complete');
CREATE TYPE user_status AS ENUM ('regular', 'admin');

CREATE TABLE users(
    id UUID PRIMARY KEY,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    user_status user_status DEFAULT 'regular',
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ
);

CREATE TABLE food_menus(
    id UUID PRIMARY KEY,
    food_name VARCHAR NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category VARCHAR NOT NULL,
    price VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ
);

CREATE TABLE orders(
    id UUID PRIMARY KEY,
    quantity_ordered INT NOT NULL,
    order_status order_status DEFAULT 'new',
    created_date TIMESTAMPTZ,
    modified_date TIMESTAMPTZ,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    menu_id UUID NOT NULL REFERENCES food_menus (id) ON DELETE CASCADE
);
