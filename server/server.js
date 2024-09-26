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

app.listen(8080, () => {
  console.log("Server is running on port 8080.");
});
