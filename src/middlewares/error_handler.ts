import { ErrorRequestHandler } from "express";

export const error_handler: ErrorRequestHandler = (error, req, res, next) => {
  res.status(500).send({
    message: error.message,
    stack: error.stack,
  });
};
