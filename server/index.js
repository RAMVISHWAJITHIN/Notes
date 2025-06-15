import express from "express";
import cors from 'cors';
import authRouter from './routes/auth.js';
import noteRouter from './routes/note.js'; 
import mongoDB from "./db/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter); 

app.listen(3000, () => {
  mongoDB();
  console.log("App is listening on port 3000");
});
