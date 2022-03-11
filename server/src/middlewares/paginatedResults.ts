import { Request, Response, NextFunction } from "express";

interface pagResult {
  next?: {
    page: number;
    limit: number;
  };
  result: [];
  previous: {
    page: number;
    limit: number;
  };
}

// declaring a global object for new response property
declare global {
  namespace Express {
    interface Response {
      paginatedResults?: pagResult;
    }
  }
}

export const paginatedResults = (model: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // query vales from the api
    const page = parseInt(`${req.query.page}`) || 1;
    const limit = parseInt(`${req.query.limit}`) || 5;

    // paginated pages
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let results: any = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    try {
      results.result = await model.find().limit(limit).skip(startIndex).exec();
      next();
    } catch (error) {
      res.status(500).json({ message: error });
    }
    res.paginatedResults = results as pagResult;
  };
};
