import { Hono } from "hono";
const PORT = Number(process.env.PORT)
const app = new Hono()
import auth from "./src/routes/auth";
import list from "./src/routes/list";


app.route("/auth", auth)
app.route("/list", list)

app.get("/", (c) => {
    return c.text("hello world")
})



Bun.serve({
    fetch: app.fetch,
    port: PORT
})

console.log(`app running on port http://localhost:${PORT}`);
