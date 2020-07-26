const nodemailer = require('nodemailer');
const config = require('./../../config/emails.json');
const sendEmail = async (user, token) => {
    let transporter = await nodemailer.createTransport({
        host: 'smtp.chmail.ir',
        port: 465,
        secure: true,
        auth: {
            user: config.email,
            pass: config.password,
        },
    });

    let mailOptions = {
        from: config.email,
        to: user.email.toString(),
        subject: 'recoveryPassword',
        text: `for reset password please click on below link\n\n  
        http://localhost:3000/reset/${token}`,
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = sendEmail;
