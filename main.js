const express = require('express');
const config = require('./config');
const apiRouter = require('./api');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser('secret'));
app.use(express.json());
app.use('/api', apiRouter);

app.set('json replacer', (key, value) => {
    if (key === 'password') { return undefined; }
    return value;
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server error!');
})

app.listen(config.port, () => console.log(`Server: Listening on port ${config.port}`))