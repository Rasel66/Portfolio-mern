const express = require('express');
const router = new express.Router();
const users = require('../models/userSchema');
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS 
    }
})

router.post('/sendEmail', async(req, res)=>{
    const {fullName, email, msg} = req.body;

    if(!fullName || !email){
        res.status(401).json({status: 401, error: "All input required."})
    }

    try {
        const preuser = await users.findOne({email: email});

        if(preuser){
            const userMessage = await preuser.Messagesave(message);

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending email using nodeJs",
                text: "Your email has been sent"
            }

            transporter.sendMail(mailOptions,(error, info)=>{
                if(error){
                    console.log("Error " + error)
                }
                else{
                    console.log("Email sent" + info.response);
                    res.status(201).json({status: 201, message: "Email sent successfully."})
                }
            });
        }else{
            const newUser = new users({
                fullName, email, msg
            })
            const storeUser = await newUser.save();

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending email using nodeJs",
                text: "Your email has been sent"
            }

            transporter.sendMail(mailOptions,(error, info)=>{
                if(error){
                    console.log("Error " + error)
                }
                else{
                    console.log("Email sent" + info.response);
                    res.status(201).json({status: 201, message: "Email sent successfully."})
                }
            });
            res.status(201).json({status: 201, storeUser})
        }
    } catch (error) {
        res.status(401).json({status: 401, error: "All input required."})
        console.log("Catch error")
    }
})




module.exports = router;