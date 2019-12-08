const express = require('express');
const morgan = require('morgan');
const CronJob = require('cron').CronJob;
const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API);
var now = new Date();
const Users = require('./models/Users');


// init

const app = express();
require('./database')

// settings

app.set('port', process.env.PORT || 3000);

// middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes

app.use(require('./routes'));

// agenda

new CronJob('* * * * 0-7', async function() {
    // Code to run 

    now = new Date();
    const day = now.getDate().toString()
    const month = now.getMonth()+1
    const comDate = `${day}-${month.toString()}`
    // minutes(0-59)
    // hours(0-23)
    // day of month(0-31)
    // month(0-12 o nombres)
    // day of week (0-7, 7 is sunday)
    const users = await Users.find({"birthdate": comDate, "sended": false})
    const list = users.length

    switch (list) {
        case 0:
            console.log("List empty, current time: " + now)
            break;
        default:
            console.log("Match!")
            const msg = {
                to:         users[0].email,
                from:       process.env.MYUSER,
                subject:    'subjet',
                text:       'End Linie',
                html: `
                <p>Good Morning :)</p>
                <p>${users[0].firstname}, ${users[0].lastname}</p>
                <p>I wish you a happy birthday</p>
                <p>I hope you have a nice day</p>
                <p>attentively ${process.env.MYUSER}</p>
                <hr/>
                `,
            };
            const upuser = await Users.updateOne({"email": users[0].email}, {$set:{sended: true}})
            sgMail.send(msg);
            console.log("sended to: " + users[0].email)
            break;
    }
    const userToRestart = await Users.find({"sended": true})
    for (let index = 0; index < userToRestart.length; index++) {
            if (userToRestart[index].birthdate !== comDate) {
                const updateUser = await Users.updateOne({"email": userToRestart[index].email}, {$set:{sended: false}})
                console.log("User is again ready", userToRestart[index].email)
            } 
    }

}, function() {
}, true);


module.exports = app;