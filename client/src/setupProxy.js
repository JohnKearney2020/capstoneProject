const { createProxyMiddleware }= require('http-proxy-middleware');


module.exports = function(app) {
    
    
    app.use( createProxyMiddleware('/.netlify/functions/', {
    target: 'http://localhost:9000/',
    pathRewrite: {
        '^/\\.netlify/functions': '',
    },
    })
);
};

// ==========
// THIS CODE CREATES A PROXy BY DIRECTLY ACCESSING THE EXPRESS APP INSTANCE 
// CREATED BY CREATE-REACT-APP 