import { model, Schema } from "mongoose"
import validator from 'validator';

/**
 * Iuser interface
 */
export interface IUser {
    _id: string,
    firstName: string,
    lastName: string,
    displayName: string,
    email: string,
    phoneNumber: string,
    bio: string,
    profileImage: string,
    role: string,
}

/**
 * User schema
 */
class UserSchema {
    /**
     * Gets schema
     */
    static get schema() {
        var schema: Schema<IUser> = new Schema(
            {
                _id: { type: String, trim: true },
                firstName: { type: String, trim: true },
                lastName: { type: String, trim: true },
                displayName: {
                    type: String,
                    required: [true, "display name is required"],
                },
                email: {
                    type: String,
                    validate: [validator.isEmail, "Please provide a valid email address"],
                    required: [true, "email is required"],
                    unique: true,
                    trim: true,
                    lowercase: true
                },
                phoneNumber: {
                    type: String,
                    validate: [
                        validator.isMobilePhone,
                        "Please provide a valid phone number",
                    ],
                },
                bio: {
                    type: String,
                    required: false,
                    max: 255,
                },
                profileImage: {
                    type: String,
                    required: false,
                    max: 255,
                },
                role: {
                    type: String,
                    required: true,
                    enum: {
                        values: ['Free', 'Basic', 'Admin'],
                        message: '{VALUE} is not supported'
                    },
                    default: 'Free'
                },
            },
            { timestamps: true }
        );


        return schema
    }

}

const User = model<IUser>("users", UserSchema.schema);


// Export Mongoose model
export default User;