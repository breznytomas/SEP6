
class NotFoundError extends Error {
    statusCode: number
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.statusCode = 404;
    }
}

class BadRequestError extends Error {
    statusCode: number
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = 400;
    }
}

class InternalServerError extends Error {
    statusCode: number
    constructor(message) {
        super(message);
        this.name = "InternalServerError";
        this.statusCode = 500;
    }
}


export function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong, please try again later';
    res.status(statusCode).send({ message });
}

export  function handleErrorAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err =>{
            if (err) {
                errorHandler(err, req, res, next)
            }
            else{
                next()
            }
        });
    }
}




