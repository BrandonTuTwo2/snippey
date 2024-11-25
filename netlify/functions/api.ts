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

router.get("/getAll", async (req, res) => {
  const collection = await db.collection("sticky_notes");
  //Remember to sort by email first
  const resTest = await collection.find({}).toArray();

  res.send({
    body: resTest,
  });
});

router.post("/add", async (req, res) => {
  const reqVals = JSON.parse(req.body)
  try{
    const newSticky = {
        name: reqVals.title,
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

router.post("/delete", async (req, res) => {
  res.send({
    body: "HI",
  });
});

api.use("/api/", router);
export const handler = serverless(api);
