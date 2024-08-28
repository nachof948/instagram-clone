import { User } from '../models/User.js'
import getDataUri from '../utils/dataUri.js'
import clodinary from '../utils/cloudinary.js'

export const getProfile = async (req, res) => {
    const { userId } = req.params
    try {
        let user = await User.findById(userId).select('-password');
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};

export const editProfile = async (req, res) => {
    const userId = req.user.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;

    try {
        let updateData = {};

        if(bio) updateData.bio = bio;
        if(gender) updateData.gender = gender;
        if(profilePicture){
            const fileUri = getDataUri(profilePicture);
            const cloudResponse = await clodinary.uploader.upload(fileUri);
            updateData.profilePicture = cloudResponse.secure_url;
        }
        
        const user = await User.findByIdAndUpdate(userId, updateData, {
            new: true, 
        }).select('-password');

        if(!user){
            return res.status(404).json({
                message:'Usuario no encontrado',
                success: false
            })
        };

        return res.status(200).json({
            message:'Perfil actualizado',
            success: true,
            user
        })

    } catch (error) {
        console.log(error)
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({_id: {$ne: req.user.id}}).select("-password");

        if (suggestedUsers.length === 0) {
            return res.status(404).json({
                message: 'Actualmente no tenemos ningún usuario',
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            users: suggestedUsers
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Error al obtener usuarios sugeridos',
            success: false
        });
    }
};

export const followOrUnfollow = async (req, res) => {
    const userId = req.user.id
    const followId = req.params.id
    try {
        if(userId === followId) {
            return res.status(400).json({
                message:'No podes seguirte a vos mismo.',
                success: false
            })
        }
        
        const user = await User.findById(userId);
        const targetUser = await User.findById(followId)
        
        if(!user || !targetUser) {
            return res.status(400).json({
                message:'Usuario no encontrado',
                success: false
            })
        }
        
        const isFollowing = user.following.includes(followId)
        if(isFollowing){
            await Promise.all([
                User.updateOne({_id:userId},{$pull:{following: followId}}),
                User.updateOne({_id:followId},{$pull:{followers: userId}})
            ])
            return res.status(200).json({message:'Dejaste de seguir', success:true})
        }else{
            await Promise.all([
                User.updateOne({_id:userId},{$push:{following: followId}}),
                User.updateOne({_id:followId},{$push:{followers: userId}})
            ])
            return res.status(200).json({message:'Comenzaste de seguir', success: true})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error al seguir o dejar de seguir al usuario',
            success: false
        });
    }
};