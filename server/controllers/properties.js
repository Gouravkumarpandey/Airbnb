import properties from "../models/properties";


export const AddProperties = async (req, res, next) =>{
try{
const {title, description, price, location, images} = req.body;
const Property = new properties({
    title,
    desc,
    img,
    rating,
    location,
    price,
});
const createdProperty = await Property.save();
return res



} catch (err) {
        next(err);
    }
};

export const GetProperties = async (req, res, next) =>{
try{
    let { search } = req.query;
    const filter ={};
    if (search){
        filter.$or =[
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
        ];
    }
const Property = await properties.find(filter,{
    title:1,
    desc:1,
    img:1,
    rating:1,
    location:1,
    price:1,
});
return res.status(200).json(properties);

} catch (err) {
        next(err);
    }
};

export const GetPropertyDetails = async (req, res, next) =>{
try{} catch (err) {
        next(err);
    }
};