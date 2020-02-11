require("dotenv").config();
const express = require("express");
const session = require("express-session");
const check = require("./middlewares/checkForSession");
const swagCtrl = require("./controllers/swagController");
const auth = require("./controllers/authController");
const cart = require("./controllers/cartController");
const search = require('./controllers/searchController');

const app = express();
const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(check.checkForSession);

// app endpoints
app.get("/api/swag", swagCtrl.read);
app.post("/api/login", auth.login);
app.post("/api/register", auth.register);
app.post("/api/signout", auth.signout);
app.get("/api/user", auth.getUser);
app.post(`/api/cart/checkout`, cart.checkout);
app.post(`/api/cart/:id`, cart.add);
app.delete(`/api/cart/:id`, cart.delete)
app.get(`/api/search/`, search.search)

app.listen(SERVER_PORT, () =>
  console.log(`Servin' up some heat on Port ${SERVER_PORT}`)
);
