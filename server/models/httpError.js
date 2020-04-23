// Important - look at the constructor. When we call this class, it will expect a message and errorCode argument

class HttpError extends Error { // extends let us expand upon the built in Error class
    constructor(message, errorCode) {
        super(message); // Add a "message" property to this class. super() calls the constructor of the base class, i.t.c. 'Error'
        this.code = errorCode; // Adds a 'code' property to this class
    }
}

module.exports = HttpError; //export this class so we can use it outside of this file