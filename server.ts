import "dotenv/config";
import app from "./src/app";

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});

import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();


app.use(express.json());
app.use(cors());

export default app;
