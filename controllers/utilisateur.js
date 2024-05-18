import User from '../models/utilisateur.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { sendWelcomeEmail } from '../middlewares/sendEmail.js';

export async function addUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let image = '';
        if (req.file) {
            image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`;
        } else {
            image = '../public/images/avatar.jpg';
        }

        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
            country: req.body.country, 
            specialization: req.body.specialization,
            rating: req.body.rating,
            language: req.body.language,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            address: req.body.address,
            birthDate: req.body.birthDate,
            image: image,
            passportNumber: req.body.passportNumber, 
        });
        await sendWelcomeEmail(newUser.email);
        res.status(201).json({ message: "User added successfully", newUser });
        console.log("User added successfully");
    } catch (err) {
        res.status(500).json({ error: 'Error adding user', details: err });
    }
}

export function getUser(req,res){
    user
    .findOne({username:req.params.username})
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
export function getAllUsers (req,res){
    user
    .find()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
export function deleteUser (req,res){
    user
    .deleteOne({username:req.params.username})
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
export function updateUser (req,res){
    user
    .findOneAndUpdate({username:req.params.username},{username:req.body.username,password:req.body.password})
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
export async function validateUser (req,res){
    try{
    const userFind=await user.findOne({ username: req.body.username})
        if (!userFind) {
           return res.status(404).json({message:"user not found in dataBase"})
        }
        const verifyPass= await bcrypt.compare(req.body.password,userFind.password)
        if (verifyPass){
            res.status(200).json({ message: "this user is valid", userFind: userFind.username })
        }
        else {
            res.status(405).json({message:"password incorrect"})
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}