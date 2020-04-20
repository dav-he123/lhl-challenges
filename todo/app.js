const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

listsDB = {
  VbXn9: {
    name: "Groceries",
    items: [
      { taskName: "Buy Carrots", completed: false },
      { taskName: "Buy Cereal", completed: true },
      { taskName: "buy Rice", completed: true },
      { taskName: "buy chips", completed: false },
    ],
    user_id: "FXF2X",
  },
  XnC3f: {
    name: "Clean Up",
    items: [
      { taskName: "Wipe Floor", completed: false },
      { taskName: "Vaccum", completed: false },
    ],
    user_id: "FXF2X",
  },
  BcD2f: {
    name: "Workout",
    items: [
      { taskName: "Bench", completed: false },
      { taskName: "Squads", completed: false },
      { taskName: "Pull Ups", completed: false },
      { taskName: "Dead Lift", completed: false },
    ],
    user_id: "D3XiL",
  },

  //.....
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(listsDB);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/todo", (req, res) => {
  let templateVars = {
    lists: listsDB,
  };
  res.render("index", templateVars);
});

app.get("/todo/new", (req, res) => {
  res.render("new");
});

app.get("/todo/:uuid", (req, res) => {
  let templateVars = {
    uuid: req.params.uuid,
    specificTask: listsDB[req.params.uuid],
    todoItems: listsDB[req.params.uuid].items,
  };
  res.render("show", templateVars);
});

app.post("/todo", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
