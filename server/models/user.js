import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        favorites: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Properties",
            default: [],
        },
        bookings: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Properties", 
            default: [],
        }
    },
    {
        timestamps: true,
    }
);

// Change to default export
const User = mongoose.model('User', UserSchema);
export default User;