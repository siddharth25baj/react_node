const express = require('express')
const app = express()
const http = require('http').Server(app);
const bodyParser = require('body-parser')
const useragent = require('express-useragent');
const cors = require('cors')
const { throwNotFoundError } = require('./errors')
const routes = require('./routes')
const { PORT } = require('./config')


app.use(useragent.express());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Accpt-Control-Allow-Origin', '*');
    req.headers['Accept-Encoding'] = 'gzip, deflate'
    next();
});
const db = require('./db')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }))
app.use(express.static('public'))

//included in the server.js file of our node.js backend
app.get('/api/v1/create-sitemap', function (req, res) {
    
    return res.send({ status: 200, message: 'success' })
});

app.use(express.static('public/build'))

/* Cors */
app.use(cors())

routes(app);

// catch 404 and forward to error handler
app.use((request, response) => {
    return throwNotFoundError(response, 'PAGE NOT FOUND')
})

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    })
    .on('SIGTERM', function () {
        console.error('SIGTERM is called !');
        server.close(function () {
            process.exit(0);
        });
    });

http.listen(PORT, function () {
    console.log(`server is listening on ${PORT}`);
});
