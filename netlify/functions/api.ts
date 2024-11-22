import express, { Router } from "express";
import serverless from "serverless-http";
import { ObjectId } from "mongodb";
import db from "./db/connection";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const api = express();
const router = Router();

router.get("/test", async (req,res) =>{
    const collection = await db.collection("sticky_notes");
    const resTest = await collection.find({}).toArray();

    console.log("HI");
    console.log(resTest);
    
    res.send({
        body: "HI",
})});

router.get("/getAll", async (req,res) =>{
    const collection = await db.collection("sticky_notes");
    //Remember to sort by email first
    const resTest = await collection.find({}).toArray();

    res.send({
        body: resTest,
})});

router.post("/add", async (req,res) =>{
    res.send({
        body: "HI",
})});

router.post("/update", async (req,res) =>{
    res.send({
        body: "HI",
})});

router.post("/delete", async (req,res) =>{
    res.send({
        body: "HI",
})});




api.use("/api/", router);
export const handler = serverless(api);