const express = require("express");
const todosData = require("./constants");
const router = express.Router();
const database = require("../../database");

router
  // Add a binding to handle '/test'
  .get("/", async (req, res, next) => {
    const todos = await database
      .select("id", "description", "completed")
      .from("todolist");

    console.log("1111", todos);

    res.send(todos);
  });

router.post("/", async (req, res, next) => {
  console.log("req", req.body);
  const result = await database
    .insert(req.body)
    .into("todolist")
    .returning("id");
  console.log("result", result);
  res.send("2");
});

router.delete("/:id", async (req, res, next) => {
  console.log("del", req.params);
  const result = await database
    .from("todolist")
    .where("id", req.params.id)
    .del();
  console.log("delete", result);
  res.send("deleted");
});

router.put("/:id", async (req, res) => {
  console.log("put", req.body);
  const result = await database
    .into("todolist")
    .where("id", req.params.id)
    .update({
      description: req.body.description,
      completed: req.body.completed,
    });
  console.log("updated", result);
  res.send("updated");
});

router.get("/:id", (req, res, next) => {
  res.send(todosData[req.params.id]);
});

module.exports = router;
