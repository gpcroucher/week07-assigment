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

    // add the owner to the DB and save the ID
    const ownerInsertResult = await db.query(
      `INSERT INTO week07_assignment_pet_owners (name) VALUES ($1) RETURNING id`,
      [ownerName]
    );
    const ownerID = ownerInsertResult.rows[0].id;

    // add the species to the DB and save the ID
    const speciesInsertResult = await db.query(
      `INSERT INTO week07_assignment_pet_species (name) VALUES ($1) RETURNING id`,
      [petSpecies]
    );
    const speciesID = speciesInsertResult.rows[0].id;

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
