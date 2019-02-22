import passport from 'passport';
import derivedPassportJwt from 'passport-jwt';
const JwtStrategy = derivedPassportJwt.Strategy;
import { ExtractJwt } from 'passport-jwt';
import derivedPassportLocal from 'passport-local';
const LocalStrategy = derivedPassportLocal.Strategy;
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import db from './usingDB/db/index'

dotenv.config();

const helper = {
    async isValid(password, validMailPassword) {
        return await bcrypt.compare(password, validMailPassword);
    }
}

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
}, async (payload, done) => {
    try {
        // Find the users specified in token
        const text = `SELECT * FROM userTable WHERE id=$1`;
        const {rows} = await db.query(text, [payload.sub]);

        // If user does not exist, handle it 
        if (!rows[0]) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, rows[0]);
    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const text = `SELECT * FROM userTable WHERE email=$1`;
        const { rows } = await db.query(text, [email]);
        // If not, handle it
        if (!rows[0]) {
            return done(null, false);
        }

        // Check if the password is correct
        const originalPassword = rows[0].password;
        const isMatch = await helper.isValid(password, originalPassword);

        // If not, handle it 
        if (!isMatch) {
            return done(null, false)
        }

        // Otherwise, return the user
        done(null, rows[0])
    } catch (err) {
        throw new Error(err);
    }

}))