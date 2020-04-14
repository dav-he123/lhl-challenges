const express = require("express");
const PORT = 8080; // default port 8080
const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");
const app = express();
app.use(cookieParser());

app.set("view engine", "ejs");

// app.use(cookieSession({ name: "user_id", secret: "asdfg" }));

usersDB = {
  FXF2X: { id: "FXF2X", email: "a@b.com", password: "password" },
  D3XiL: { id: "D3XiL", email: "b@c.com", password: "password" },
  //...
};

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
  // let templateVars = { greeting: "This is my TODO List" };

  // let user;
  // if (req.session.user_id) {
  //   user = req.session.user_id;
  // } else {
  //   res.redirect("/login");
  //   return;
  // }

  // // have to think about this templateVars
  let templateVars = {
    // urls: toDoForUser(req.session.user_id),
    // user: usersDB[user],
    listsDB,
  };

  res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// have to think about this function
function toDoForUser(id) {
  const result = {};
  for (const obj in listsDB) {
    if (listsDB[obj].user_id === id) {
      result[obj] = listsDB[obj];
    }
  }
  console.log(result);
  return result;
}
