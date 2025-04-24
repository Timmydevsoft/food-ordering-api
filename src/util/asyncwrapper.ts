import { Request, Response, NextFunction } from "express";

const asyncWrapper = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return function (req: Request, res: Response, next: NextFunction): void {
    fn(req, res, next).catch(next);
  };
};

export default asyncWrapper;
