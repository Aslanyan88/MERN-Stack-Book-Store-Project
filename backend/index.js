import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import  bookRoute from './routes/books.Route.js';
import cors from 'cors'; 

const app = express();



// Middleware for handling CORS POLICY
//Option1:Allow ALL Origins with Defoult of cors(*)
app.use(cors());


//Option2:Allow Custom Origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET', 'POST', 'PUT', 'DELETE'],
//         allowHeaders:['Content-Type']
//     })
// )

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/books',bookRoute);
// Main function to connect to the database and start the server
async function main() {
    try {
        await mongoose.connect(mongoDBURL);
        console.log("Database connected");

        const server = app.listen(PORT, () => {
            console.log(`App is listening on port:${PORT}`);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use. Please close the conflicting process or use a different port.`);
            } else {
                console.error("Server startup error:", err);
            }
        });
    } catch (err) {
        console.error("Database connection failed:", err);
    }
}

main();


