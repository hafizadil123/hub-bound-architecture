const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

const StartServer = async () => {

    const app = express();

    await databaseConnection();

    await expressApp(app);

    app.get('/test', (req, res) => {
        return res.status(200).json({
            message: 'Hello World',
            status: 'success'
        })
    })
    
    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

StartServer();