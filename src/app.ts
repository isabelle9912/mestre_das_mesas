import "express-async-errors";

// import "./models/_associations";

import express, { Application, json } from "express";
import path from "path";

import { handleError } from "./errors";

import userRoutes from "./routes/user.routes";
import loginRoutes from "./routes/login.routes";
import extratoRoutes from "./routes/color.routes";


const app: Application = express();
app.use(json());

app.use(express.static(path.join(__dirname, "..", "docs")));

// Rota para renderizar o index.html quando acessarem a raiz '/'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "docs", "index.html"));
});

app.use("/login", loginRoutes);
app.use("/users", userRoutes);
app.use("/extrato", extratoRoutes);

// não colocar coisas a baixo desse "use"
app.use(handleError);

export default app;
