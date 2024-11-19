import express from "express";
import auth from "./routes/auth";
import events from "./routes/events";
import chat from "./routes/chat";
import bodyParser from "body-parser";
import dotenv from "dotenv";

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

// Setup static app file route
app.get('/', express.static('app/dist'))

// Setup API endpoints
app.use('/api/auth', auth);
app.use('/api/events', events);
app.use('/api/chat', chat);

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`))
