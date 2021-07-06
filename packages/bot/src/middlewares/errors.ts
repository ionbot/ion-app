import type { RequestHandler, ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import env from "../env";

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(createHttpError(404));
};

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (!error.statusCode || error.statusCode >= 500) {
    console.log(error);
    res.status(error.statusCode ?? 500);
    return res.json({
      ok: false,
      message: env.isProd ? "There was an error" : error.message,
    });
  }

  res.status(error.statusCode);
  res.json({
    ok: false,
    message: error.message,
  });
};
