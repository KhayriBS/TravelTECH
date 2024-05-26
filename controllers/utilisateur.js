import User from '../models/utilisateur.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { sendEmail} from '../middlewares/sendEmail.js';
import { createToken } from '../middlewares/createToken.js';

export async function signUp(req, res) {
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
        const username = req.body.username;
        const token = await createToken(username);
        const newUser = await User.create({
            username: username,
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
            token: token, 
        });

        const activationUrl = `http://localhost:9090/user/activation?token=${newUser.token}`;

        await sendEmail({
            to: newUser.email,
            subject: 'Votre compte a été créé avec succès',
            userData: {
                name: newUser.username,
                message: `Votre compte a été créé avec succès. Cliquez sur le lien ci-dessous pour activer votre compte :</br><br><a href="${activationUrl}">Activer votre compte</a>`
                      }
        });

        res.status(201).json({ message: "User added successfully", newUser ,activation:activationUrl });
        console.log("User added successfully");
    } catch (err) {
        res.status(500).json({ error: 'Error adding user', details: err.message });
    }
}
export async function signIn (req,res){
    try{
    const userFind=await User.findOne({ username: req.body.username })
        if (!userFind) {
           return res.status(404).json({message:"user not found in dataBase"})
        }
        const verifyPass= await bcrypt.compare(req.body.password,userFind.password)
        if (verifyPass){
             const token = createToken(userFind.username);   
            res.status(200).json({ message:'this '+userFind.role+' is valid',  user: {username: userFind.username, role: userFind.role} ,token :token })
        }
        else {
            res.status(405).json({message:"password incorrect"})
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}
export async function activation (req,res){
    try {
        const { token } = req.query;
        const user = await User.findOne({ token: token });
        if (!user || user.isActivated) {
            return res.status(400).json({ message: 'Invalid or already activated account' });
        }
        user.isActivated = true;
        await user.save();
        res.status(200).json({ message: 'Account activated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to activate account' });
    }}
    
    export async function forgetPassword(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const token = user.token;
            console.log(token);
            const resetUrl = `http://localhost:9090/user/resetpass?token=${token}`;
            await sendEmail({
                to: user.email,
                subject: 'Réinitialisation de votre mot de passe',
                userData: {
                    name: newUser.username,
                    message:`<p>Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p><br><a href="${resetUrl}">Réinitialiser votre mot de passe</a>`
         } });
            
            res.status(200).json({ message: "Email de réinitialisation de mot de passe envoyé.",resetUrl:resetUrl});
        } catch (err) {
            res.status(500).json({ error: 'Erreur lors de la réinitialisation du mot de passe', details: err });
        }
    }
    export async function addNewPass (req,res){
        try {
            const { token } = req.query;
            const user = await User.findOne({ token: token });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const { newPassword } = req.body;
            const hashedPassword = await bcrypt.hash(newPassword,10);
            const updateUser = await User.findOneAndUpdate({token:token},{ password: hashedPassword },{ new: true } );
            console.log(updateUser)
            res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


export function getUser(req,res){
    User
    .findOne({username:req.params.username})
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
export function getAllUsers (req,res){
    User
    .find()
    .then(users=>{
        res.status(200).json(users)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
export function deleteBanUser(req, res) {
    User
   .deleteOne({ username: req.params.username, isBanned: true }) 
   .then(deletedUser => {
        if (deletedUser.deletedCount > 0) {
            res.status(200).json({ message: 'Delete banned user successfully' });
        } else {
            res.status(404).json({ message: 'User not found or already deleted' });
        }
    })
   .catch(err => {
        res.status(500).json({ error: 'Erreur when delete the banned user', details: err.message });
    });
}
export function updateUser (req,res){
    User
    .findOneAndUpdate({username:req.params.username},{username:req.body.username,password:req.body.password})
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

export async function ban (req, res) {
    try {
            const { username } = req.body;
            const userToUpdate = await User.findOne({ username: username });
            if (!userToUpdate) {
                return res.status(404).json({ message: 'User not found' });
            }
            userToUpdate.isbanni = true;
            await userToUpdate.save();
            res.status(200).json({ message: 'User successfully banned' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error banning user' });
    }
}
export async function countUsers(req, res) {
    console.log("list users with role:", req.body.role);
    console.log('1');
    try {
        const totalUsers = await User.countDocuments({});
        console.log('2');
        const nbrClients = await User.countDocuments({ role: 'client' });
        const nbrGuides = await User.countDocuments({ role: 'guide' });
        const BannedUsers=await User.countDocuments({ isBanned: true });
        const ActivatedUsers=await User.countDocuments({ isActivated: true });
        console.log("All users:", totalUsers, "Clients:", nbrClients, "Guides:", nbrGuides , "Banned users:",BannedUsers,"Activated users:",ActivatedUsers);

        res.status(200).json({totalUsers, nbrClients, nbrGuides,BannedUsers,ActivatedUsers});
    } catch (err) {
        console.error("Error counting users:", err.message);
        res.status(500).json({error: err.message});
    }
}
export function searchUserByRole(req, res) {
    User.find({ role: req.body.role })
    .then(users => {
            console.log("Users found:", users);
            res.status(200).json(users);
        })
    .catch(err => {
            console.error("Error searching users:", err);
            res.status(500).json({error: err});
        });
}
