import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmail, getUserById } from "../models/user.js";

// Configuration de la stratégie locale pour Passport.
// On spécifie que le client enverra "email" et "password".
const config = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(config, async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return done(null, false, { erreur: "mauvais_utilisateur" });
      }
      const valide = await bcrypt.compare(password, user.password);
      if (!valide) {
        return done(null, false, { erreur: "mauvais_mot_de_passe" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Sérialisation de l'utilisateur : on stocke uniquement l'email dans la session.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Désérialisation : récupération de l'utilisateur via son email.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
