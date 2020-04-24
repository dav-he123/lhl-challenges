const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ name: "user_id", secret: "asdfg" }));

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

app.get("/todo.json", (req, res) => {
  res.json(listsDB);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/todo", (req, res) => {
  // let user = req.session.user_id;

  let user;
  if (req.session.user_id) {
    user = req.session.user_id;
  } else {
    res.redirect("/login");
    return;
  }

  // console.log(req.session.user_id);

  let templateVars = {
    // lists: listsDB,
    lists: itemsForUser(req.session.user_id),
    user: usersDB[user],
  };
  res.render("index", templateVars);
});

app.get("/todo/new", (req, res) => {
  let templateVars = {
    user: usersDB[req.session.user_id],
  };
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  }

  res.render("new", templateVars);
});

app.get("/todo/:uuid", (req, res) => {
  let templateVars = {
    uuid: req.params.uuid,
    specificTask: listsDB[req.params.uuid],
    todoItems: listsDB[req.params.uuid].items,
    user: usersDB[req.session.user_id],
    // todoItems: itemsForUser(req.session.user_id),
    // lists: itemsForUser(req.session.user_id),
  };
  res.render("show", templateVars);
  return;
});

app.get("/register", (req, res) => {
  let templateVars = {
    user: undefined, //Need to make sure no logged in user can see this
  };

  res.render("registration", templateVars);
});

app.get("/login", (req, res) => {
  let templateVars = {
    user: undefined,
  };

  res.render("login", templateVars);
});

app.post("/todo/:uuid", (req, res) => {
  // listsDB[req.params.uuid].items.push(req.body.items),

  // user = req.session.user_id;

  // if (listsDB[req.params.uuid].user_id === req.session.user_id) {
  // let emptyObj = { taskName: req.body.items, completed: false };
  // console.log(listsDB[req.params.uuid].items.push(emptyObj));
  // listsDB[req.params.uuid].items.push(emptyObj);
  // }
  // listsDB[req.params.uuid].items = req.body.items;

  console.log(req.body);
  let emptyObj = { taskName: req.body.items, completed: false };

  // console.log(listsDB[req.params.uuid].items.push(emptyObj));

  console.log(emptyObj);

  // listsDB[req.params.uuid].items = [];

  listsDB[req.params.uuid].items = [];

  let arr = listsDB[req.params.uuid].items;
  // console.log(listsDB[req.params.uuid].items.push(emptyObj));
  // console.log(arr.push(emptyObj));
  arr.push(emptyObj);

  // console.log(listsDB[req.params.uuid].items.push(emptyObj));

  // console.log(listsDB[req.params.uuid].items.assign(emptyObj));
  // listsDB[req.params.uuid].items.push(emptyObj);

  // console.log(listsDB[req.params.uuid].items.push(emptyObj));

  // append multiple values to the array
  // listsDB[req.params.uuid].items.push(emptyObj);

  // let length = 10;

  // for (let i = 0; i < length; i++) {
  // console.log(listsDB[req.params.uuid].items.push(emptyObj));
  // console.log(listsDB[req.params.uuid].items);
  // }
  // console.log(match.push(listsDB[req.params.uuid].items.push(emptyObj)));

  res.redirect(`/todo/${req.params.uuid}`);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.statusCode = 403;
    res.end("The email or password is empty. 403 Forbidden.");
  } else {
    const user = emailLookup(usersDB, email);
    if (!user) {
      res.statusCode = 403;
      res.end("User is not found! Please try again!");
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user_id = user.id;
        res.redirect("/todo");
      } else {
        res.statusCode = 403;
        res.end(
          "Invalid password, please try again. The password is case sensitive."
        );
      }
    }
  }
  getUserByEmail(req.body.email, usersDB);
  // res.cookie("name", "user_id");
});

app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/todo");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.statusCode = 400;
    res.end("The email or password is empty. Status code: 400"); //This error message shows up if the user does not register email or password in the browser.
  } else if (emailCheck(usersDB, req.body.email)) {
    res.statusCode = 400;
    res.end("The email is already being used. Status code: 400"); //This error message shows up when user registers the same username and password that has already been registered
  }

  let randomID = generateRandomString();

  usersDB[randomID] = {
    id: randomID,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  // res.cookie("user_id", "ss@gmail.com");

  req.session.user_id = randomID;
  getUserByEmail(req.body.email, usersDB);

  res.redirect("/todo");
});

app.post("/todo", (req, res) => {
  // console.log(req.body); // Log the POST request body to the console

  let uuid = generateRandomString();

  listsDB[uuid] = {
    // lists: listsDB,
    name: req.body.name,
    user_id: req.session.user_id,
  };

  res.redirect("/todo/" + uuid);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

function generateRandomString() {
  let randString = Math.random().toString(36).substring(2, 7);
  return randString;
}

const getUserByEmail = function (email, database) {
  for (const key of Object.keys(database)) {
    if (email === database[key].email) {
      return database[key];
    }
  }
  return false;
};

const emailCheck = function (usersDB, email) {
  //The emailCheck function is used to compare the email in users object with email inputted by the user.
  for (const check of Object.keys(usersDB)) {
    if (email === usersDB[check].email) {
      return true;
    }
  }
  return false;
};

const emailLookup = function (usersDB, email) {
  // The emailLookup function is used to compare the email in users object with email inputted into the browser and returns email stored in object
  for (const objectKey of Object.keys(usersDB)) {
    if (email === usersDB[objectKey].email) {
      console.log("true");
      return usersDB[objectKey];
    }
  }
  return false;
};

// function addingNewItem(addedItem) {
//   const result = {};
//   for (const obj in listsDB) {
//     listsDB[obj] = addedItem;
//     result[obj] = listsDB[obj];
//   }
//   console.log(result);
//   return result;
// }

function itemsForUser(id) {
  const result = {};
  for (const obj in listsDB) {
    if (listsDB[obj].user_id === id) {
      result[obj] = listsDB[obj];
    }
  }
  console.log(result);
  return result;
}

// function add(elem) {
//   // console.log(listsDB[req.params.uuid].items.push(emptyObj));

//   // console.log(emptyObj);
//   // listsDB[req.params.uuid].items = [];

//   let arr = listsDB[req.params.uuid].items;
//   arr = [];

//   for (let i = 0; i < arr.length; i++) {
//     arr.push(elem);
//   }

//   return arr;
// }
