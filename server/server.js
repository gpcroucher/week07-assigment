import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

app.get("/", async (_, response) => {
  response.json("You are looking at my root route, how roude!");
});

app.get("/pets", async (_, response) => {
  const dbResult = await db.query(`
    SELECT pets.name AS petname, pets.age AS age, owners.name AS ownername, breeds.name AS breed, species.name AS species
    FROM week07_assignment_pets AS pets
    INNER JOIN week07_assignment_pet_owners AS owners ON owner_id = owners.id
    INNER JOIN week07_assignment_pet_breeds AS breeds ON breed_id = breeds.id
    INNER JOIN week07_assignment_pet_species AS species ON breeds.species_id = species.id;`);
  response.json(dbResult.rows);
});

app.post("/pets", async (request, response) => {
  const { petName, age, breed, petSpecies, ownerName } = request.body;
  try {
    // check that the client has sent all the details we need
    if (!petName || (!age && age != 0) || !breed || !petSpecies || !ownerName) {
      throw new TypeError("Client didn't send some of the required pet info.");
    }

    const ownerID = await addOwner(ownerName);
    const breedID = await addBreed(breed, petSpecies);

    // add the pet to the DB using the owner and species IDs
    const petInsertResult = await db.query(
      `INSERT INTO week07_assignment_pets (name, age, owner_id, breed_id) VALUES ($1, $2, $3, $4);`,
      [petName, age, ownerID, breedID]
    );

    // send back OK status
    response.status(200).send();
  } catch (error) {
    console.log("Something went wrong.", error.message);
    response.status(400).json(error.message); // Bad Request
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});

/*
functions
*/

// add an owner to the database
// return the ID of the new record
async function addOwner(name) {
  // check if the owner is already in the DB
  const { found, id } = await isInTable(
    "week07_assignment_pet_owners",
    "name",
    name
  );

  // exit early if the owner is found
  if (found) {
    return id;
  }

  // add the owner to the DB and return the ID
  const ownerInsertResult = await db.query(
    `INSERT INTO week07_assignment_pet_owners (name) VALUES ($1) RETURNING id`,
    [name]
  );
  return ownerInsertResult.rows[0].id;
}

// add an owner to the database
// return the ID of the new record
async function addBreed(name, species) {
  // check if the species is already in the DB
  const { found, id } = await isInTable(
    "week07_assignment_pet_breeds",
    "name",
    name
  );

  // exit early if the species is found
  if (found) {
    return id;
  }

  // get the species ID or add the species to the DB if necessary
  const speciesID = await addSpecies(species);

  // add the breed to the DB and save the ID
  const breedInsertResult = await db.query(
    `INSERT INTO week07_assignment_pet_breeds (name, species_id) VALUES ($1, $2) RETURNING id`,
    [name, speciesID]
  );
  return breedInsertResult.rows[0].id;
}

// add a species to the database
// return the ID of the new record
async function addSpecies(name) {
  // check if the species is already in the DB
  const { found, id } = await isInTable(
    "week07_assignment_pet_species",
    "name",
    name
  );

  // exit early if the species is found
  if (found) {
    return id;
  }

  // add the species to the DB and save the ID
  const speciesInsertResult = await db.query(
    `INSERT INTO week07_assignment_pet_species (name) VALUES ($1) RETURNING id`,
    [name]
  );
  return speciesInsertResult.rows[0].id;
}

// check if a value is present in a given column in a table
// return the id of the (first) matching row or false if there is no matching row
async function isInTable(table, column, value) {
  const selectResult = await db.query(
    `SELECT * FROM ${table} WHERE ${column}='${value}'`
  );
  if (selectResult.rows.length <= 0) {
    return { found: false };
  } else {
    return { found: true, id: selectResult.rows[0].id };
  }
}

// used for testing but potentially dangerous in production because it could be used to access my other supabase tables
/*
app.get("/isInTable", async (request, response) => {
  const { table, column, value } = request.body;
  const { found, id } = await isInTable(table, column, value);
  if (found) {
    response.json(
      `Value: '${value}' matches the value of the column '${column}' in table '${table}' on row id: ${id}`
    );
  } else {
    response.json(
      `Value: '${value}' not found in column '${column}' in table '${table}'`
    );
  }
});
*/
