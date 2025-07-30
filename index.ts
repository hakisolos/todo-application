import { Hono } from "hono";
import { Session, sessionMiddleware,CookieStore } from "hono-sessions";
import type { sessionDataTypes } from "./src/types/user";

const PORT = Number(process.env.PORT)

const app = new Hono<{
  Variables: {
    session: Session<sessionDataTypes>,
    session_key_rotation: boolean
  }
}>()
import auth from "./src/routes/auth";
import list from "./src/routes/list";

app.route("/auth", auth)
app.route("/list", list)

const encryptionKey = String(process.env.ENCRYPTIONKEY)
const store = new CookieStore()


app.use('*', sessionMiddleware({
  store,
  encryptionKey: encryptionKey, 
  expireAfterSeconds: 9000, 
  autoExtendExpiration: true,
  cookieOptions: {
    sameSite: 'Lax',    
    path: '/', 
    httpOnly: true, 
  },
}))



app.get("/", (c) => {
    return c.text("hello world")
})



Bun.serve({
    fetch: app.fetch,
    port: PORT
})

console.log(`app running on port http://localhost:${PORT}`);
