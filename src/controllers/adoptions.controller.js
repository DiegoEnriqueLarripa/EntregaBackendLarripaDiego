import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.json({status:"success",payload:result}) // Cambiado a .json
}

const getAdoption = async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) return res.json({status:"error",error:"Adoption not found"}) // Cambiado a .json
    res.json({status:"success",payload:adoption}) // Cambiado a .json
}

const createAdoption = async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) return res.status(404).json({status:"error", error:"user Not found"}); // Cambiado a .json
    const pet = await petsService.getBy({_id:pid});
    if(!pet) return res.status(404).json({status:"error",error:"Pet not found"}); // Cambiado a .json
    if(pet.adopted) return res.status(400).json({status:"error",error:"Pet is already adopted"}); // Cambiado a .json
    
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    
    res.status(200).json({status:"success",message:"Pet adopted"}) // Cambiado a .json
}

export {
    createAdoption,
    getAllAdoptions,
    getAdoption
};