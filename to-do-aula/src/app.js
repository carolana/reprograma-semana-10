const express = require("express");
const cors = require("cors");
const postsRoutes = require("./routes/postRoutes");

const app = express();

app.use(cors());

app.use(express.json());

// definir uma rota padrão
app.use("/posts", postsRoutes)














module.exports = app;