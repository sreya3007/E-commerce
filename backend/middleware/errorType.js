const notFound = (req, res, next) => {
  const error = new Error(`page not found ${req.originalUrl}`); // middleware for every known error 
  res.status(404);
  //res.json(err);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // cast error ke liye bhi middleware bnana hai remember
if(err.name==='CastError'  &&  err.kind==='ObjectId'){
message=`Resource not found`;
statusCode=404;
}

  res.status(statusCode).json({
    message: message,
    err,
    
  });
};

module.exports={ notFound, errorHandler };




  
