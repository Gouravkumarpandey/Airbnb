import express from 'express';
import { 
    AddToFavorites,
    GetUserFavorites,
    RemoveFromFavorites,
    SignUp,
    SignIn,
    BookProperty,
    GetBookedProperty, // Fixed capitalization
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/addToFavorites", [verifyToken], AddToFavorites);
router.post("/getFavorites", [verifyToken], GetUserFavorites);
router.post("/removeFavorites", [verifyToken], RemoveFromFavorites);
router.post("/booking", [verifyToken], BookProperty);
router.post("/getBooking", [verifyToken], GetBookedProperty); // Fixed capitalization

export default router;