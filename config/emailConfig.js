import nodemailer from 'nodemailer';

// Créez un transporteur de courriels
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: 'loulamhamdi@gmail.com', 
        pass: 'avrl vyvt gjet mkkn'  
    }
});

// Vérifiez la connexion avec le serveur SMTP
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

export default transporter;