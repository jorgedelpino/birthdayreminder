if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const app = require('./app');

app.listen(app.get('port'), () => {
    console.log('server on Port', app.get('port'))
});