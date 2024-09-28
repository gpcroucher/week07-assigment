import dotenv from "dotenv";
import pg from "pg";

const [, , ...args] = process.argv;

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

seed();

async function seed() {
  await makeTables();
  if (!args.includes("empty")) {
    await insertExamples();
  }
}

async function makeTables() {
  await db.query(`
    DROP TABLE IF EXISTS week07_assignment_pet_owners CASCADE;
    DROP TABLE IF EXISTS week07_assignment_pet_species CASCADE;
    DROP TABLE IF EXISTS week07_assignment_pet_breeds CASCADE;
    DROP TABLE IF EXISTS week07_assignment_pets;
    `);
  await db.query(`
    CREATE TABLE week07_assignment_pet_owners (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE week07_assignment_pet_species (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(100)
    );

    CREATE TABLE week07_assignment_pet_breeds (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(255) NOT NULL,
      species_id INT NOT NULL REFERENCES week07_assignment_pet_species (id)
    );

    CREATE TABLE week07_assignment_pets (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name VARCHAR(100) NOT NULL,
      age INT,
      owner_id INT NOT NULL,
      breed_id INT NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES week07_assignment_pet_owners (id),
      FOREIGN KEY (breed_id) REFERENCES week07_assignment_pet_breeds (id)
    );
    `);
}

async function insertExamples() {
  await db.query(`
    INSERT INTO week07_assignment_pet_owners (name) VALUES ('Turner') RETURNING id;
    INSERT INTO week07_assignment_pet_owners (name) VALUES ('Jon Arbuckle') RETURNING  id;

    INSERT INTO week07_assignment_pet_species (name) VALUES ('dog') RETURNING id;
    INSERT INTO week07_assignment_pet_species (name) VALUES ('cat') RETURNING id;

    INSERT INTO week07_assignment_pets (name, owner_id, species_id) VALUES ('Hooch', 1, 1);
    INSERT INTO week07_assignment_pets (name, owner_id, species_id) VALUES ('Garfield', 2, 2);
    `);
}
