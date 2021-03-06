import express from 'express';
import '@babel/polyfill';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import meetupsRoutes from './routes/meetups';
import questionsRoutes from './routes/questions';
import usersRoutes from './routes/users';

const app = express();

app.use(morgan('dev'));
app.use(express.json());app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/v1/users/', usersRoutes);
app.use('/v1/meetups/', meetupsRoutes);
app.use('/v1/questions/', questionsRoutes);

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'YAY! Congratulations on your first endpoint!'});
});


// Handle errors for requests to unavailable routes
app.use((req, res, next) => {
    const error = new Error('Route Not found');
    error.status = 404;
    next(error);
})

// This is where all errors and uncatched errors within the routes are thrown
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: {message: `this error is thrown from server.js ${error.message}`}});
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{console.log(`server is running on port ${port}`)});


export default app;