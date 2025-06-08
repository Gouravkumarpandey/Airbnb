import express from 'express';
import{ 
    AddToFavorites,
    GetUserFavorites,
    RemoveFromFavorites,
    SignUp,
    SignIn,
    BookProperty,
    GetBookedproperty,
} from"../controllers/user.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/addToFavorites", [verifyToken], AddToFavorites);
router.post("/getFavorites", [verifyToken], GetUserFavorites);
router.post("/removeFavorites", [verifyToken], RemoveFromFavorites);
router.post("/booking", [verifyToken], BookProperty);
router.post("/getBooking", [verifyToken], GetBookedproperty);

export default router;