import carservice from '../services/carservice.js';

export const addcar = async (req, res) => {
    try {
        const car = req.body;
        const newcar = await carservice.addcar(car);
        return res.status(201).json(newcar);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getallcars = async (req, res) => {
    try {
        const cars = await carservice.getcars();
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getcarsbyowner = async (req, res) => {
    try {
        const userid = req.params.userid;
        const cars = await carservice.getcarsbyowner(userid);
        return res.status(200).json(cars);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getcarbyid = async (req, res) => {   
    try {
        const id=req.params.id;
        const car=await carservice.getcarbyid(id);
        return res.status(200).json(car);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}
export const updatecar=async(req,res)=>{
    try {
        const id=req.params.id;
        const car=req.body;
        const updatedcar=await carservice.updatecar(car,id);
        return res.status(200).json(updatedcar);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}


export const deleteCar=async(req,res)=>{
    try {
        const id=req.params.id;
        const deletedcar=await carservice.deletecar(id);
        return res.status(200).json(deletedcar);
    } catch (error) {
        return res.status(500).json({error:error.message});
    }
}