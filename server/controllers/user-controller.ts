import User, { IUser } from "../models/user";



/**
* User Controller
*/

export class UserController {
    constructor() { }

    /**
     * Gets users
     * @returns  an array of users
     */

    async getUsers() {
        try {
            return {
                data: await User.find({}),
            }
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
    async getUserById(id: string) {
        try {
            return {
                data: await User.findById(id),
            }
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
    async createUser(user: IUser) {
        try {
            const created = await User.create(user);

            let result: boolean = false;

            if (created !== null) result = true;

            if (!result) throw new Error("Create failed");

            return {
                message: "Create successful",
            };
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
    async updateUser(user: IUser) {
        try {
            const updated = await User.findByIdAndUpdate(user._id, user);

            let result: boolean = false;

            if (updated !== null) result = true;

            if (!result) throw new Error("Update failed");

            return {
                message: "Update successful",
            };
        } catch (error: any) {
            throw new Error(error);
        }
    }

    /**
     * Remove User
     * @param id 
     * @returns  response message
     */
    async deleteUser(id: string) {
        try {
            let deleted = await User.findByIdAndDelete({ _id: id });

            let result: boolean = false;

            if (deleted !== null) result = true;

            if (!result) throw new Error("Delete failed");

            return {
                message: "Delete successful",
            };
        } catch (error: any) {
            throw new Error(error);
        }
    }
}