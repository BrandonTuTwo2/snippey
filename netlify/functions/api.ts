import express, { Router } from "express";
import serverless from "serverless-http";
import { ObjectId } from "mongodb";
import db from "./db/connection";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const api = express();
const router = Router();

router.get("/test", async (req, res) => {
  const collection = await db.collection("sticky_notes");
  const resTest = await collection.find({}).toArray();

  console.log("HI");
  console.log(resTest);

  res.send({
    body: "HI",
  });
});

router.post("/getAll", async (req, res) => {
  const collection = await db.collection("sticky_notes");
  const req_author_id = JSON.parse(req.body).author_id;
  const query = { author_id: req_author_id };
  //Remember to sort by email first

  const result = await collection.find(query).toArray();

  res.send({
    body: result,
  });
});

router.post("/add", async (req, res) => {
  const reqVals = JSON.parse(req.body)
  try{
    const newSticky = {
        name: reqVals.name,
        body: reqVals.body,
        author_id: reqVals.user,
        tags: []
    }
    console.log(newSticky);
    const collection = await db.collection("sticky_notes");
    const result = await collection.insertOne(newSticky);
    res.sendStatus(204);
  } catch (err) {
    console.log(err)
    res.status(500).send("Failed to add sticky note");
  }
});

router.patch("/update", async (req, res) => {
  res.send({
    body: "HI",
  });
});

router.delete("/delete", async (req, res) => {
  res.send({
    body: "HI",
  });
});

api.use("/api/", router);
export const handler = serverless(api);
