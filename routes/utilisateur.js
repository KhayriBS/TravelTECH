import express from 'express';
import { body } from 'express-validator';
import { getUser, getAllUsers, updateUser, signIn, countUsers, searchUserByRole, forgetPassword, activation, ban, deleteBanUser, addNewPass, signUp } from '../controllers/utilisateur.js';
import multer from '../middlewares/multer-config.js';
import passport from 'passport';
const router = express.Router();

router
.route('/')
.post([
    multer,
    body('username').isLength({ min: 5, max: 50 }),
    body('email').isLength({ min: 6, max: 50 }),
    body('password').isLength({ min: 8, max: 50 }),
    signUp
  ])
.get(getAllUsers);

router
.route('/login')
.get(signIn);

router
.route('/:username')
.get(getUser)
.delete(deleteBanUser)
.patch(updateUser);

router
.route('/stat')
.post(countUsers);

router
.route('/search')
.post(searchUserByRole);

router
.route('/forgetpass')
.post(forgetPassword);

router
.route('/activation')
.post(activation);

router
.route('/ban')
.post(ban);

router
.route('/resetpass')
.put(addNewPass);

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Authentification réussie, redirigez l'utilisateur vers une page appropriée
    res.status(200).json({message:"facebook user added with success//connected"})
   
  }
);

export default router;
