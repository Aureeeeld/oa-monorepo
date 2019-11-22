import express from "express";
import passport from "passport";
import DiscordStrategy from "passport-discord";

import { saveUserInDB } from "../../utils/auth/discord";
import { getSocket } from "../../utils/socket";

// * Load environment variables
import "../../lib/env";

const CLIENT_ID: string = process.env.CLIENT_ID!;
const CLIENT_SECRET: string = process.env.CLIENT_SECRET!;
const CALLBACK_URL: string = process.env.CALLBACK_URL!;

// * Permissions
const scope = ["identify"];

// * Passport
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      scope
    },
    (accessToken, refreshToken, profile, cb) => {
      saveUserInDB(accessToken, refreshToken, profile);

      // * Send data to callback
      cb(null, {
        id: profile.id
      });
    }
  )
);

// * Router
const router = express.Router();

// * Session
const addSocketIdToSession = (req: any, res: any, next: any) => {
  req.session.socketId = req.query.socketId;
  next();
};

// * Endpoint triggered by popup
router.get(
  "/",
  addSocketIdToSession,
  passport.authenticate("discord", { scope })
);

// * Endpoint that receive data from Discord
router.get(
  "/callback",
  passport.authenticate("discord", {
    failureRedirect: "/"
  }),
  (req: any, res) => {
    // * Socket
    const io = getSocket();

    // * Send user data to front
    io.in(req.session.socketId).emit("user", req.user);

    res.end();
  }
);

export default router;
