const express = require("express");
const listRouter = require("./controllers/list");
const app = express(); //it's working
const booksRouter = express.Router();
const products = ["Apple", "Pen", "Computer"];
const bodyParser = require("body-parser"); //for parsing body
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  //CORS
  app.options("*", (req, res) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

app.use((req, res, next) => {
  console.log(
    "Date",
    new Date(),
    "Method",
    req.method,
    "URL",
    req.originalUrl,
    "IP",
    req.ip
  );
  next();
});

app.use("/list", listRouter);

app.use("/static", express.static(__dirname + "/public"));

app.get("/", (req, res, next) => {
  res.send("its working");
});

app.get("/todolist", (req, res, next) => {
  console.log("Page", req.query.page);
  res.json({ todolist });
});

app.get("/products", (req, res, next) => {
  console.log("Page", req.query.page);
  res.send(products);
  // res.json({ products });
});

app.get("/products/:id", (req, res, next) => {
  if (products[req.params.id]) {
    res.send(products[req.params.id]);
  } else {
    res.status(404).send("Product not found");
  }
});

booksRouter.get("/", (req, res) => {
  res.send("Books");
});

booksRouter.get("/about", (req, res) => {
  res.send("About books");
});

app.get("/blog", (req, res, next) => {
  res.redirect(301, "/");
});

app.get("/downloadBooks", (req, res, next) => {
  res.download("./public/books.html", "anoterName", (err) => {
    console.log("File sent");
  });
});

app.use("/books", booksRouter);

app.use((err, req, res, next) => {
  console.log("err.stack");
  res.status(500).send(err.stack);
});

app.listen(5000, () => {
  console.log("Its started", new Date());
});
