import express from 'express'
import {body} from 'express-validator';
import { addUser,getUser,getAllUsers,deleteUser,updateUser, validateUser } from '../controllers/utilisateur.js';
import multer from '../middlewares/multer-config.js';
const router=express.Router()
router
.route('/')
.post(
    multer,
    body('username').isLength({min:5 , max:50}),
    body('email').isLength({min:6 , max:50}),
    body('password').isLength({min:8 , max:50}),
    addUser
)
.get(getAllUsers)
router
.route('/validate')
.get(validateUser)
router
.route('/:username')
.get(getUser)
.delete(deleteUser)
.patch(updateUser)
export default router