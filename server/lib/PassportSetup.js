import passport from "passport";
import User from "../models/User.js";
import JwTStrategy from "passport-jwt/lib/strategy.js";
import ExtractJwt from "passport-jwt/lib/extract_jwt.js";
import JwtStrategy from "passport-jwt/lib/strategy.js";
import Application from "../models/Application.js";
import { application } from "express";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

export default (app) => {
    // Setup Passport local strategy (for username/password authentication)
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    //JWT Strategy
    passport.use(new JwtStrategy(options, (jwtPayload, done) => {
        Application.findById(jwtPayload.id, (error, application) => {
            if (error) return done(error, false);
            if (!application) return done(null,false);

            return done(null, application);
        });
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.isAuthenticated();
        res.locals.isAdmin = req.user?.role === "ADMIN";
        res.locals.isUser = req.user?.role === "USER";
        next();
    });
};
