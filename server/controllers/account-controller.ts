import User, { IUser } from "../models/user";
import { Request, Response, NextFunction } from "express";



/**
* User Controller
*/

export class AccountController {
    constructor() { }

    /**
     * Gets users
     * @returns  an array of users
     */

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await User.find({});

            res.status(200).json({ users: users })
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Gets specified user by id
     * @param id 
     * @returns  User object
     */
    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findById(req.params.id);

            res.status(200).json({ user: user })
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Public route create user profile
     * @param user 
     * @returns response message 
     */
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            let user = {
                _id: req.body.uid,
                email: req.body.email,
                displayName: req.body.email,
                isSubscribed: req.body.isSubscribed,
            }

            const created = await User.create(user);

            if (!created) throw new Error("Create failed");

            res.status(201).json({
                message: "Create successful",
            });
        }
        catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Update User
     * @param id 
     * @param User 
     * @returns  response message
     */
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            let user = {
                _id: req.params.id,
                displayName: req.body.displayName,
                profileImage: req.body.profileImage,
            }

            const updated = await User.findByIdAndUpdate(user._id, user);


            if (!updated) throw new Error("Update failed");

            res.status(204).json({
                message: "Update successful",
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Remove User
     * @param id 
     * @returns  response message
     */
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            let deleted = await User.findByIdAndDelete({ _id: req.params.id });

            if (!deleted) throw new Error("Delete failed");

            res.status(200).json({
                message: "Delete successful",
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }
}