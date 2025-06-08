import User from '../models/user.js';
import Property from '../models/properties.js';
import { createError } from "../error.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

export const SignUp = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return next(createError(409, "Email is already in use"));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = new User({
            name,
            email,
            password: hash,
        });

        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
            expiresIn: "9999 years",
        });

        return res.status(201).json({ token, user });

    } catch (err) {
        next(err);
    }
};

export const SignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(404, "User not found"));
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong password or email"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "9999 years",
        });

        const { password: userPassword, ...otherDetails } = user._doc;
        return res.status(200).json({ token, user: otherDetails });

    } catch (err) {
        next(err);
    }
};

export const BookProperty = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { propertyId } = req.body;

        const property = await Property.findById(propertyId).exec();
        if (!property) {
            return next(createError(404, "Property not found"));
        }

        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }

        if (!user.bookings.includes(propertyId)) {
            user.bookings.push(propertyId);
            await user.save();
        }

        return res.status(200).json({ message: "Property booked successfully" });

    } catch (err) {
        next(err);
    }
};

export const GetBookedProperty = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate({
            path: "bookings",
            model: "Property",
        });
        
        if (!user) {
            return next(createError(404, "User not found"));
        }

        return res.status(200).json(user.bookings);

    } catch (err) {
        next(err);
    }
};

export const AddToFavorites = async (req, res, next) => {
    try {
        const { propertyId } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return next(createError(404, "User not found"));
        }

        if (!user.favorites.includes(propertyId)) {
            user.favorites.push(propertyId);
            await user.save();
        }

        return res.status(200).json({ message: "Property added to favorites" });

    } catch (err) {
        next(err);
    }
}

export const RemoveFromFavorites = async (req, res, next) => {
    try {
        const { propertyId } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        
        user.favorites = user.favorites.filter((fav) => !fav.equals(propertyId));
        await user.save();
        
        return res.status(200).json({ message: "Property removed from favorites" });
        
    } catch (err) {
        next(err);
    }
};

export const GetUserFavorites = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate("favorites").exec();

        if (!user) {
            return next(createError(404, "User not found"));
        }

        return res.status(200).json(user.favorites);
    } catch (err) {
        next(err);
    }
};