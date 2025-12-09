const express = require("express");
const bodyParser = require("body-parser");

const notesRoutes = require("./routes/notes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(notesRoutes);
app.use((req, res, next) => {
  res.send("<h1>Fallback Request Handler</h1>");
});

app.listen(3000);
