import express from 'express'; //ES Modules
import userRoutes from './routes/userRoutes.js'

// Create a new express application instance
const app = express();

// Start pug
app.set('view engine', 'pug');
app.set('views', './views');

// Public directory
app.use(express.static('public'));

// Define a route handler for the default home page
app.use('/auth', userRoutes);

// Define a port to run the server on
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});