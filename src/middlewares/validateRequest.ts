import { Request, Response, NextFunction } from "express";
import { ZodTypeAny, ZodError } from "zod";

export const validateRequest = (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction):any => {
  try {
    schema.parse(req.body);
    return next();
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json({error:e.errors});
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

