import { Hono } from "hono";
import { db } from "../supabase";

const auth = new Hono()


auth.post("/signup", async(c) => {
    const body = await c.req.json()
    if(!body.email || !body.password) {
        return c.json({error: "bad request", code: 401}, 401)
    } 
    const {data, error} =  await db.auth.signUp({
        email: body.email,
        password: body.password
    })
    if(error) {
        return c.json({status: 500, error: error}, 500)
    }
    return c.json({message: "signup successful", data: data}, 200)
})




auth.post("/login", async(c) => {
    const body = await c.req.json()
    if(!body.email || !body.password) {
        return c.json({error: "bad request", code: 401}, 401)
    }
    const {data, error} = await db.auth.signInWithPassword({
        email: body.email,
        password: body.password
    })
    if(error) {
        return c.json({status: 500, error: error}, 500)
    }
    

})

export default auth


