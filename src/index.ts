import express from "express";
import auth from "./routes/auth";
import events from "./routes/events";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

// Initialize Express app
const app = express();
const port = 3000;

// Load environment variables
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('missing JWT_SECRET environment variable');
}

if (!process.env.DATABASE_URL) {
  throw new Error('missing DATABASE_URL environment variable');
}

app.use(bodyParser.json());
app.use(cors());

// Setup static app file route
app.get('/', express.static('app/dist'));

// Setup API endpoints
app.use('/api/auth', auth);
app.use('/api/events', events);

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`))
