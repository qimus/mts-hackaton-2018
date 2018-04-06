let path = require('path'),
    webpack = require('webpack'),
    express = require('express'),
    config = require('./webpack.config'),
    app = express(),
    compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.get("*", function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function(err) {
    if (err) {
        return console.error(err);
    }

    console.log('Listening at http://localhost:3000/');
});