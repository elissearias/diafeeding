SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='diafeeding';
DROP DATABASE IF EXISTS diafeeding; 
DROP SCHEMA public; 

CREATE DATABASE diafeeding
WITH OWNER = Postgres
ENCODING = 'UTF-8';

\c diafeeding;

CREATE SCHEMA diafeeding_users; 
ALTER DATABASE diafeeding SET search_path TO diafeeding_users;
SET search_path TO diafeeding_users; 

CREATE DOMAIN email AS varchar NOT NULL 
	CHECK (VALUE ~'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');

CREATE DOMAIN username AS varchar(20) NOT NULL 
	CHECK (VALUE  ~'^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._-]+(?<![_.])$');

CREATE DOMAIN password AS VARCHAR NOT NULL;

CREATE DOMAIN id_meal AS varchar NOT NULL 
	CHECK (VALUE ~'^(BT|LC|DR|MC|AC)$');

CREATE DOMAIN time_user AS TIME NOT NULL;

CREATE DOMAIN type_meal AS VARCHAR NOT NULL
    	CHECK (VALUE ~'^[A-Z\s]+$');

CREATE DOMAIN food_name AS VARCHAR NOT NULL 
    	CHECK (VALUE ~'^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$');

CREATE DOMAIN fullname AS VARCHAR NOT NULL 
    	CHECK (VALUE ~'^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$');

CREATE DOMAIN status  AS SMALLINT  
	DEFAULT 1;


CREATE TABLE roles (
	id_role serial NOT NULL,
	role VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY (id_role, role)
);


CREATE TABLE meals (
	id_value_meal id_meal,
	meal_name type_meal,
    	PRIMARY KEY (id_value_meal)
);

CREATE TABLE users (
	id_user serial,
	email email UNIQUE,
	fullname fullname,
	username username,
	password password,
	wake_up time_user,
	sleep time_user,
	status status,
	fk_role VARCHAR NOT NULL,
    	PRIMARY KEY (id_user),
	FOREIGN KEY (fk_role) REFERENCES roles (role)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);


CREATE TABLE selected_foods (
	id_selected_food serial NOT NULL,
	selected_food_name food_name,
	fk_id_meal id_meal,
    	PRIMARY KEY (id_selected_food),
    	FOREIGN KEY (fk_id_meal) REFERENCES meals (id_value_meal)
    	ON UPDATE CASCADE
    	ON DELETE CASCADE
);

CREATE TABLE eat_meals (
	id_combination serial NOT NULL,
	foods text [],
	dates date,
    	email email UNIQUE,
    	fk_id_meal id_meal,
    	PRIMARY KEY (id_combination),
    	FOREIGN KEY (fk_id_meal) REFERENCES meals (id_value_meal) 
    	ON UPDATE CASCADE
    	ON DELETE CASCADE
);

