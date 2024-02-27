// const express =require("express")
import express, { request, response } from "express";
import cors from "cors";
import fs from "fs";
const port = 8080;
const app = express();
app.use(cors());
app.use(express.json());
var jsonData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
app.get("/", (request, response) => {
  response.status(200).send(jsonData);
});
app.post("/", (request, response) => {
  let data = request.body;
  jsonData.push(data);
  fs.writeFileSync("data.json", JSON.stringify(jsonData));
  response.status(200).send(data);
});
app.delete("/:id", (request, response) => {
  const userId = request.params.id;
  console.log(userId);
  const deleteId = jsonData.filter((el) => el.id.id !== userId);
  fs.writeFileSync("data.json", JSON.stringify(deleteId));
  response.status(200).send(deleteId);
});
app.listen(port, () => {
  console.log(`ene port http://localhost:${8080}/`);
});
