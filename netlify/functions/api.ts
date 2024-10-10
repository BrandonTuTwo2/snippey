import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();
const router = Router();

router.get("/test", async (req,res) =>{
    res.send({
        body: "HI",
})});


api.use("/api/", router);
export const handler = serverless(api);