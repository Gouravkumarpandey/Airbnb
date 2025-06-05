import  mongoose from 'mongoose';

const userSchema = new mongoose.Scema (
    {
        name: {
            type: String ,
            required: true,
            
        },
        email:{
            type: String,
            required: true,
            unique: true, 
        },

        password: {
            type: String,
            required: true,
        },

        favourites: {
            type:[mongoose.Schema.Type.ObjectId],
            ref: "Properties",
            default: [],
        },

         bookings: {
            type:[mongoose.Schema.Type.ObjectId],
            ref: "Properties",
            default: [],
        },

},
{
    timestamps: true,
}
);