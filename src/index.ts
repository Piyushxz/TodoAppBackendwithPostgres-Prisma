import { PrismaClient } from "@prisma/client";
import express from "express"
import { string, z } from "zod";
const client = new PrismaClient()
const app = express()


app.get("/user",async (req,res)=>{

    const users = await client.user.findMany()

    res.json({users})
})


app.get("signup",async (req,res)=>{

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const age = req.body.age
    const city = req.body.city

   
    const requiredBody = z.object({
        username:z.string().min(50).max(5),
        email:z.string().email(),
        password:z.string().regex(/^[a-zA-Z0-9]+$/).min(5).max(50),
        age:z.number().max(60).min(18),
        city:z.string()

    })
    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success){
        res.status(400).json({error:"Invalid formart"})
        return;
    }

    try{
        await client.user.create({
            data:
            {
                username:parsedBody.data?.username,
                password:parsedBody.data?.password,
                age:parsedBody.data?.age,
                city:parsedBody.data?.city
            }
        }
        )
        res.status(200).json({message:"Created user succesfully"})
    }catch(error){
        res.status(500).json({message:"Could Not create user"})
    }


})


app.listen(3000)

