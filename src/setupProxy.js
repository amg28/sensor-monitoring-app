const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/sensors',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    )

    app.use(
        '/sensorValues',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true
        })
    )
}