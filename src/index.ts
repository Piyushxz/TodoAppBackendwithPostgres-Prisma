import { PrismaClient } from "@prisma/client";
import express from "express"
const client = new PrismaClient()
const app = express()


app.get("/user",async (req,res)=>{

    const users = await client.user.findMany()

    res.json({users})
})


app.listen(3000)

