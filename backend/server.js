const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv')


// Handle uncaught exceptions

process.on('uncaughtException', err =>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down due to uncaught exceptions`);
    process.exit(1);
})

//setting up config files
dotenv.config({path: 'backend/config/config.env'})

//connected Database 
connectDatabase() 
const server = app.listen(process.env.PORT, () => {
    console.log(`App listening on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// hendle unhandled promise rejections

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejections`);
    server.close(() => {
        process.exit(1);
    })
})
