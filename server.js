const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

let app = express();

app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url} `;
  console.log(log);
  fs.writeFileSync("server.log", log + "/n");

  next();
});
/*
app.use((req, res, next) => {
  res.render("offline.hbs");
}); */

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("upperCase", (text) => {
  return text.toUpperCase();
});

// GET POST PUT PATCH DELETE ----------------> HTTP REQUESTS

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "درباره ما",
    currentlyYear: new Date().getFullYear(),
    aboutText: " Lorem ipsum dolor sit amet ",
  });
});
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "صفحه خانه",
    homeText: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolore",
  });
});
app.get("/help", (req, res) => {
  res.render("help.hbs", {
    pageTitle: "درخواست کمک",
    helpText: "Lorem ipsum dolor sit amet",
  });
});
app.listen(3000, () => {
  console.log("Server Run on port 3000");
});
