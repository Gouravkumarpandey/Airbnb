import properties from "../models/properties.js"; // Add .js extension

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
return res.status(200).json(createdProperty); // Add proper response

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
return res.status(200).json(Property); // Fix variable name

} catch (err) {
        next(err);
    }
};

export const GetPropertyDetails = async (req, res, next) =>{
try{
    const { id } = req.params;
    const Property = await properties.findById(id);
    return res.status(200).json(Property);        
} catch (err) {
        next(err);
    }
};