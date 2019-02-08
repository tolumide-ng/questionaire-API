import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import meetupsRoutes from './src/routes/meetups';
import questionsRoutes from './src/routes/questions';
import usersRoutes from './src/routes/users';
import rsvpsRoutes from './src/routes/rsvps'

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/v1/meetups', meetupsRoutes);
app.use('/v1/questions/', questionsRoutes);
app.use('v1/users', usersRoutes);
app.use('v1/rsvps', rsvpsRoutes);

app.get('/monty', (req, res, next) => {
    return res.status(200).json({'message': 'Congratulations! It\'s your first endpoint'});
});

// Handle errors for requests to unavailable routes
app.use((req, res, next) => {
    const error = new Error('Route Not found');
    error.status = 404;
    next(error);
})

// This is where all errors are thrown
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: {message: `this error is thrown from server.js since your endpoint controller could not cater for it ${error.message}`}});
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{console.log(`server is running on port ${port}`)});
