import { User } from "./type";

declare module "express-serve-static-core" {
    interface Request {
        user?: User; //This will tell ts to use this when req.user is called
    }
}
export {}