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

app.get("/pets", async (request, response) => {
  const dbResult = await db.query(`
    SELECT pets.name AS petname, owners.name AS ownername, species.name AS species
    FROM week07_assignment_pets AS pets
    INNER JOIN week07_assignment_pet_owners AS owners ON owner_id = owners.id
    INNER JOIN week07_assignment_pet_species AS species ON species_id = species.id;`);
  response.json(dbResult.rows);
});

app.post("/pets", async (request, response) => {
  const { petName, petSpecies, ownerName } = request.body;
  try {
    // check that the client has sent all the details we need
    if (petName == null || petSpecies == null || ownerName == null) {
      throw new Error(); // TODO: make this more informative and feed this to the catch block
    }

    const ownerID = await addOwner(ownerName);

    const speciesID = await addSpecies(petSpecies);

    // add the pet to the DB using the owner and species IDs
    const petInsertResult = await db.query(
      `INSERT INTO week07_assignment_pets (name, owner_id, species_id) VALUES ($1, $2, $3);`,
      [petName, ownerID, speciesID]
    );

    response.json(petInsertResult);
  } catch {
    // TODO: make this a useful error
    console.log("Something went wrong.");
    response.sendStatus(400); // Bad Request
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
