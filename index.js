 import app from './server/index';
//const app = require('./server/index')

const PORT = 3000 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
});