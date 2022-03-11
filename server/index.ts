import express from "express";
import session from "express-session";
import { createServer } from "http";
import * as path from "path";
import passport from "passport";
import { Strategy } from "passport-twitch-latest";
import helmet from "helmet";
import "dotenv/config";
import { initTwitch } from "./connectors/twitch";
import { initSocket } from "./connectors/socket";
import { initSpinner } from "./activities/spinner";
import { Prisma } from "./connectors/prisma";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

//init servers
const app = express();
const server = createServer(app);
initSocket(server);
initTwitch();

app.use(
  session({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new PrismaSessionStore(Prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser(function (user, done) {
//   Prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {},
//   });
//   done(null, user);
// });

// passport.deserializeUser(async (userId: number, done) => {
//   const user = await Prisma.user.findFirst({
//     where: {
//       id: userId,
//     },
//   });
//   console.log("-----------------------------");
//   console.log("deserialize user");
//   console.log(user);
//   console.log("-----------------------------");
//   done(null, user);
// });

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      callbackURL: "http:/localhost:3000/auth/twitch/callback",
      scope: "user_read",
    },
    async function (accessToken, refreshToken, profile, done) {
      const user = await Prisma.user.upsert({
        where: {
          oidc_userid: profile.id,
        },
        update: {
          oidc_userid: profile.id,
          username: profile.display_name,
          oidc_refresh_token: refreshToken,
        },
        create: {
          role: "User",
          oidc_userid: profile.id,
          username: profile.display_name,
          oidc_refresh_token: refreshToken,
        },
      });
      done(null, user);
    }
  )
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Add activitiess
initSpinner();

const port = 3001;

server.listen(port, () =>
  console.log(`Twitch wheel listening at http://localhost:${port}`)
);
