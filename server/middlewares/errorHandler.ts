import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  // res.status(statusCode).json({ messages: err.message})

  res
    .status(statusCode)
    .render("404", {
      title: "Error",
      message: err.message,
      token: req.cookies.Token,
      uid: req.cookies.Uid,
      user: req.cookies.Username,
      Type: req.cookies.Type,
    });
};

module.exports = {
  errorHandler,
};
