import { User } from "../models/User";

export interface Context {
    user?: Partial<User>;
}