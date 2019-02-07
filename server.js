import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
    return res.status(200).json({'message': 'Congratulations! It\'s your first endpoint'});
})

const port = process.env.PORT || 3000;

app.listen(port, `server is running on port ${port}`);
