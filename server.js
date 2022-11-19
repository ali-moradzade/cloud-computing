const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 8080;
const address = process.env.ADDRESS || 'localhost';

app.listen(port, address, () => {
    console.log(`Server started at: ${address} port: ${port}`);
});
