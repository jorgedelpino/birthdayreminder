# Birthday Reminder 🚀

Birthday reminder using Express, mongo DB and Sendgrid

### Needed 📋

_APIs_

```
Sendgrid API
MongoDB conection
```

## Installation 🔧

_nmp install_

_packages_

```
    "@sendgrid/mail": "^6.3.1",
    "axios": "^0.18.1",
    "cron": "^1.7.1",
    "cross-env": "^5.2.0",
    "dateformat": "^3.0.3",
    "dotenv": "^8.0.0",
    "express": "^4.17.0",
    "mongoose": "^5.5.9",
    "morgan": "^1.9.1",
    "pg-promise": "^8.7.3"
```

## Settings ⚙️

_Add new user to DB _

```
URL: http://localhost:3000/user/add
METHOD: POST
BODY:
 {
	"email": "john@mail.com",
    "firstname": "john",
    "lastname": "Bold",
    "sended": false,
    "birthdate": "31-12"
}
```

_ENV settings rename to .env_

```
MONGODB_URI=*****
SENDGRID_API=*****
MYUSER=*****
```

## Licence 📄

_MIT_
