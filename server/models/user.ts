import { model, Schema } from "mongoose"
import validator from 'validator';

/**
 * Iuser interface
 */
export interface IUser {
    _id: string,
    email: string,
    displayName: string,
    profileImage: string,
    isSubscribed: boolean,
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
                _id: { type: String, trim: true, required: [true, "id is required"], unique: true, },
                email: {
                    type: String,
                    validate: [validator.isEmail, "Please provide a valid email address"],
                    required: [true, "email is required"],
                    unique: true,
                    trim: true,
                    lowercase: true
                },
                displayName: {
                    type: String,
                    required: [true, "display name is required"],
                },
                profileImage: {
                    type: String,
                    required: false,
                    max: 255,
                },
                isSubscribed: {
                    type: Boolean,
                    required: true,
                    default: false,
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