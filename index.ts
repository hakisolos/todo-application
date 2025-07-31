import { Hono } from "hono";

import type { sessionDataTypes } from "./src/types/user";

const PORT = Number(process.env.PORT)

const app = new Hono()
import auth from "./src/routes/auth";
import list from "./src/routes/list";

app.route("/auth", auth)
app.route("/list", list)

const encryptionKey = String(process.env.ENCRYPTIONKEY)







app.get("/", (c) => {
    return c.text("hello world")
})



Bun.serve({
    fetch: app.fetch,
    port: PORT
})

console.log(`app running on port http://localhost:${PORT}`);
