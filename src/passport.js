import passport from 'passport';
import derivedPassportJwt from 'passport-jwt';
const JwtStrategy = derivedPassportJwt.Strategy;
import { ExtractJwt } from 'passport-jwt';
import derivedPassportLocal from 'passport-local';
const LocalStrategy = derivedPassportLocal.Strategy;
import dotenv from 'dotenv';
import User from './usingDB/controllers/meetupsControllers';
import db from './usingDB/db/index'

dotenv.config();

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
}, async(payload, done) => {
    try {
        // Find the users specified in token
        const text = `SELECT * FROM userTable WHERE id=$1`;
        const user = await db.query(text, [payload.sub]);

         // If user does not exist, handle it 
        if(!user) {
            console.log('This is not a valid userId');
            return done(null, false);
        }

        // Otherwise, handle it
        done(null, user); 
    } catch(err) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, passord, done) => {
    // Find the user given the email
    const text = `SELECT * FROM userTable WHERE email=$1`;
    const user = db.query(text, [req.value.body.email]);

    // If not, handle it
    if(!user) {
        return done(null, false);
    }

    // Check if the password is correct
}))