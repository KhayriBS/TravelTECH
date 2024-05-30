import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import User from '../models/utilisateur.js';
import dotenv from 'dotenv';
import { sendEmail } from '../middlewares/sendEmail.js';
dotenv.config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:9090/user/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
    async (accessToken, refreshToken, profile, done) => {
        try {
          // Récupérer l'email à partir du profil Facebook
          const email = profile.emails ? profile.emails[0].value : null;
    
      
          const existingUser = email ? await User.findOne({ email }) : null;
          if (existingUser) {
            return done(null, existingUser);
          } else {
            const newUser = new User({
              username: profile.displayName,
              password: 'hashedPassword', // cree un mot de passe hashé
              email,
              role: 'client', // par défaut
              name: profile.displayName,
              facebookId: profile.id,
              emailFb: email,
              providers: {
                facebook: {
                  id: profile.id,
                  access_token: accessToken,
                  display_name: profile.displayName,
                }
              }
            });
            await newUser.save();
            await sendEmail({
                to: newUser.email,
                subject: 'Votre compte a été créé avec succès',
                userData: {
                    name: newUser.username,
                    message: `Votre compte a été créé avec succès via facebook</a>`
                          }
            });
            return done(null, newUser);
          }
        } catch (error) {
          console.error("Une erreur s'est produite lors de la gestion de l'authentification Facebook :", error);
          return done(error);
        }
      }
    ));
// Configuration de la sérialisation de l'utilisateur
passport.serializeUser((user, done) => {
    done(null, user.id); // Stocke ID user dans la session après l'authentification
});

// Configuration de la désérialisation de l'utilisateur
passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user); // recuperer les details de user à travers user.id
    } catch (err) {
      done(err, null);
    }
  });
export default passport;
