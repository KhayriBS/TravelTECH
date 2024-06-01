import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendEmail = async ({ to, subject, userData }) => {
    try {
              const currentFilePath = fileURLToPath(import.meta.url);
              const currentDirPath = dirname(currentFilePath);
              const filePath = path.join(currentDirPath, '..', 'templateEmail', 'email.html');
              let htmlContent = fs.readFileSync(filePath, 'utf8');
        htmlContent = htmlContent.replace('[Nom]', userData.name)
                                .replace('[Message]', userData.message);
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw error; 
    }
};
