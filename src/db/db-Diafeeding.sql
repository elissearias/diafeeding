<<<<<<< HEAD
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'diafeeding';
DROP DATABASE IF EXISTS diafeeding;
DROP SCHEMA public;

CREATE DATABASE diafeeding
WITH OWNER = Postgres
ENCODING = 'UTF-8';

\c diafeeding;

CREATE SCHEMA diafeeding_users;
ALTER DATABASE diafeeding SET search_path TO diafeeding_users;
SET search_path TO diafeeding_users; 

CREATE DOMAIN email AS VARCHAR NOT NULL
	CHECK (VALUE ~'^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');

CREATE DOMAIN name AS VARCHAR NOT NULL
	CHECK (VALUE ~'^[A-Za-z¡…Õ”⁄‹—·ÈÌÛ˙¸Ò\s]+$');
	
CREATE DOMAIN telefono AS VARCHAR NOT NULL
	CHECK (VALUE ~'^[+]{1}[\d]{8,15}$');

CREATE DOMAIN fk AS SMALLINT NOT NULL;

CREATE DOMAIN dates AS DATE NOT NULL;

CREATE DOMAIN times AS TIME NOT NULL;
	

CREATE TABLE roles(
	id_role SMALLSERIAL,
	role VARCHAR NOT NULL UNIQUE,
	PRIMARY KEY (id_role, role)
);

CREATE TABLE category_questions(
	id_category SMALLSERIAL,
	category VARCHAR NOT NULL,
	PRIMARY KEY (id_category)
);

CREATE TABLE imc_clasification(
	id_imc SMALLSERIAL,
	value VARCHAR NOT NULL,
	PRIMARY KEY (id_imc)
);

CREATE TABLE pref_questions(
	id_pref SMALLSERIAL UNIQUE,
	fk_category fk,
	question VARCHAR NOT NULL,
	PRIMARY KEY (id_pref, fk_category),
	FOREIGN KEY (fk_category) REFERENCES category_questions (id_category)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE users(
	id_user SMALLSERIAL,
	email email UNIQUE,
	fullname name,
	telefono telefono,
	password VARCHAR NOT NULL,
	status BOOLEAN DEFAULT TRUE,
	fk_role VARCHAR NOT NULL,
	PRIMARY KEY (id_user),
	FOREIGN KEY (fk_role) REFERENCES roles (role)
	ON UPDATE CASCADE 
	ON DELETE CASCADE
);

CREATE TABLE users_consumption(
	fk_user fk,
	fk_imc fk,
	creation_date dates,
	daily_caloric DECIMAL NOT NULL,
	daily_grams DECIMAL NOT NULL,
	PRIMARY KEY (fk_user, creation_date),
	FOREIGN KEY (fk_user) REFERENCES users (id_user)
	ON UPDATE CASCADE 
	ON DELETE CASCADE,
	FOREIGN KEY (fk_imc) REFERENCES imc_clasification (id_imc)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE users_pref_questions(
	fk_user fk,
	fk_pref fk,
	value VARCHAR NOT NULL,
	PRIMARY KEY (fk_user, fk_pref),
	FOREIGN KEY (fk_user) REFERENCES users (id_user)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY (fk_pref) REFERENCES pref_questions (id_pref)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE user_macronutrients(
	fk_user fk,
	creation_date dates,
	hco_percentage INT NOT NULL,
	hco_cal DECIMAL NOT NULL,
	hco_grams DECIMAL NOT NULL,
	prot_percentage INT NOT NULL,
	prot_cal DECIMAL NOT NULL,
	prot_grams DECIMAL NOT NULL,
	lip_percentage INT NOT NULL,
	lip_cal DECIMAL NOT NULL,
	lip_grams DECIMAL NOT NULL,
	PRIMARY KEY (fk_user, creation_date),
	FOREIGN KEY (fk_user) REFERENCES users (id_user)
	ON UPDATE CASCADE 
	ON DELETE CASCADE
);

CREATE TABLE user_rations(
	id_ration SMALLSERIAL,
	fk_user fk,
	creation_date dates,
	food_group name,
	rations INT NOT NULL,
	prot_grams INT NOT NULL,
	lip_grams INT NOT NULL,
	hco_grams INT NOT NULL,
	energy INT NOT NULL,
	PRIMARY KEY (id_ration, creation_date),
	FOREIGN KEY (fk_user) REFERENCES users (id_user)
	ON UPDATE CASCADE 
	ON DELETE CASCADE
);


CREATE TABLE users_details(
	fk_user fk,
	wake_up times,
	sleep times,
	weight DECIMAL NOT NULL,
	height DECIMAL NOT NULL,
	dateBirth dates,
	gender BOOLEAN NOT NULL,
	activity SMALLINT NOT NULL,
	PRIMARY KEY (fk_user),
	FOREIGN KEY (fk_user) REFERENCES users (id_user)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE selected_foods(
	id_selected_food SMALLSERIAL,
	fk_user fk,
	food name,
	food_group name,
	PRIMARY KEY (id_selected_food, food),
	FOREIGN KEY (fk_user) REFERENCES users (id_user)
	ON UPDATE CASCADE
	ON DELETE CASCADE
	
);

CREATE TABLE combinations_foods(
	id_combination SMALLSERIAL,
	fk_user fk,
	foods TEXT [],
	date_combination dates,
	consumed BOOLEAN DEFAULT FALSE,
	meal name,
	PRIMARY KEY (date_combination, meal),
	FOREIGN KEY (fk_user) REFERENCES users (id_user)
	ON DELETE CASCADE
	ON UPDATE CASCADE
);


=======
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
    	CHECK (VALUE ~'^[A-Za-z¡…Õ”⁄‹—·ÈÌÛ˙¸Ò\s]+$');

CREATE DOMAIN fullname AS VARCHAR NOT NULL 
    	CHECK (VALUE ~'^[A-Za-z¡…Õ”⁄‹—·ÈÌÛ˙¸Ò\s]+$');

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

>>>>>>> refs/remotes/origin/master
