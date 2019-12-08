const { Router } = require('express')
const router = Router();

const Users = require('../models/Users');

const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API);

router.get('/', (req, res) => {
    res.send('Server is running')
});

router.get('/list', async (req, res) => {
    const users = await Users.find()
    res.json(users)
});

router.post('/user/add', async (req, res) => {

    const { email, firstname, lastname, birthdate} = req.body;
    const findTheUser = await Users.findOne({"email": email})


    if (!findTheUser) {
    const newUser = new Users({
        email,
        firstname,
        lastname,
        sended: false,
        birthdate
    });

    await newUser.save();
    res.send("done") 
    }else {
    res.send("Email ready taked") 
    }
    
});

module.exports = router;