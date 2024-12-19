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
  const req_tag_filters = JSON.parse(req.body).tags;
  let query = { author_id: req_author_id};

  if (req_tag_filters !== undefined && req_tag_filters.length != 0) {
    query = Object.assign({tags: {$in: req_tag_filters}})
  }
  //Remember to sort by email first

  const result = await collection.find(query).toArray();
  //const testbeans = await collection.find({name: "404"}).toArray();
  //console.log("HI MEEEEEEE");
  //console.log(testbeans);

  res.send({
    body: result,
  });
});

//for now its a separate function but I could probably add it to the above
router.post("/checkExist", async(req,res) =>{
  const collection = await db.collection("sticky_notes");
  const post_name = JSON.parse(req.body).name;
  const query = {name: post_name};

  const result = await collection.find(query).toArray();
  //console.log("MEMEMEMEME")
  //console.log(result)
  //If result.length != 0  then it means something with the same name already exist and vise versa
  res.send({
    body: {exist: (result.length != 0)}
  })
});

router.post("/add", async (req, res) => {
  const reqVals = JSON.parse(req.body)
  try{
    const newSticky = {
        name: reqVals.name,
        body: reqVals.body,
        author_id: reqVals.user,
        tags: reqVals.tags
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
  const collection = await db.collection("sticky_notes");
  const vals = JSON.parse(req.body);
  const query = {
    name: vals.post_name
  };
  const update = {
    $set: {body: vals.newBody}
  };
  console.log("The dimes")
  console.log(query)
  console.log(update)

  try {
    const result = await collection.updateOne(query,update);
    res.sendStatus(200)
  } catch(e) {
    console.log(e)
  }
});

router.delete("/delete", async (req, res) => {
  const collection = await db.collection("sticky_notes");
  const post_name = JSON.parse(req.body).name;
  const query = {name: post_name};
  try {
    const result = await collection.deleteOne(query);
    res.sendStatus(200)
  } catch (err){
    console.log(err)
    res.status(500).send("Failed to delete sticky note");
  }
});

api.use("/api/", router);
export const handler = serverless(api);
