import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

const handleError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction // Mesmo que não seja usado, mantenha-o para conformidade
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof ZodError) {
    res.status(400).json({ message: err.flatten().fieldErrors });
  }

  console.error(err);
  res.status(500).json({
    message: "Internal server error",
  });
};

export { AppError, handleError };
