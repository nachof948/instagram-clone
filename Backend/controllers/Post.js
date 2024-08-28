import { Post } from '../models/Post.js'
import { User } from '../models/User.js'
import { Comment } from '../models/Comment.js'
import cloudinary from '../utils/cloudinary.js'
import sharp from 'sharp'

export const addNewPost = async (req, res) =>{
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.user.id;
    try {
        if(!image) return res.status(400).json({message:'Se requiere una imagen', success:false})
        
        const optimizedImageBuffer = await sharp(image.buffer)
        .resize({width:800, height:900, fit:'inside'})
        .toFormat('jpeg',{quality:80})
        .toBuffer();
        
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId,
        })
        
        const user = await User.findById(authorId);
        if(user){
            user.posts.push(post._id)
            await user.save()
        }
        
        await post.populate({path:'author', select:'-password'});

        return res.status(201).json({
            message: 'Nuevo posteo creado',
            success:true,
            post
        })

    } catch (error) {
        console.log(error)
    }
}

export const getAllPost = async(req, res) =>{
    try {
        const posts = await Post.find({}).sort({createdAt: -1})
        .populate({path:'author', select:'username, profilePicture'})
        .populate({
            path:'comments',
            sort:{createdAt: -1},
            populate:{
                path:'author',
                select:'username, profilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success:true,
        })
    } catch (error) {
        console.log(error)
    };
};

export const getUserPost = async (req, res) =>{
    const authorId = req.user.id
    try {
        const posts = await Post.find({authorId: authorId})
        .sort({createdAt: -1})
        .populate({
            path:'author',
            select:'username, profilePicture'
        }).populate({
            path:'comments',
            sort:{createdAt: -1},
            populate:{
                path:'author',
                select:'username, profilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
};

export const likePost = async (req, res) =>{
    const userId = req.user.id;
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message: 'Posteo no encontrado', success: false})
        
        await post.updateOne({$addToSet:{likes: userId}})
        await post.save();
        
        //implement socket notification

        return res.status(200).json({message: 'Post like', success:true})

        } catch (error) {
        console.log(error)
    }
}

export const dislikePost = async (req, res) =>{
    const userId = req.user.id;
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message: 'Posteo no encontrado', success: false})
        
        await post.updateOne({$pull:{likes: userId}})
        await post.save();

        return res.status(200).json({message: 'Post disliked', success:true})
        } catch (error) {
        console.log(error)
    }
};

export const addComment = async (req, res) =>{
    const { postId } = req.params;
    const userId = req.user.id;
    const { text } = req.body;
    try {
        const post = await Post.findById(postId);
        if(!text) return res.status(400).json({message:'El texto es requerido', success: false})
        
        const comment = await Comment.create({
            text,
            author: userId, 
            post: postId
        }).populate({
            path:'author',
            select:'username, profilePicture'
        });
        
        post.comments.push(comment._id);
        await post.save();

        return res.status(201).json({
            message: 'Comentario agregado',
            comment,
            success: true
        })
        } catch (error) {
        console.log(error)
    }
};

export const getCommentsOfPost = async(req, res) =>{
    const { postId } = req.params;
    try {
        const comments = await Comment.find({post: postId}).populate('author','username','profilePicture')
        
        if(!comments) return res.status(404).json({message:'No hay comentarios', success: false})
        
        return res.status(200).json({success: true, comments})
        } catch (error) {
        console.log(error)
    }
};

export const deletePost = async(req,res) =>{
    const { postId } = req.params;
    const userId = req.user.id;
    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'El posteo no se encontro', success: false})
        
        if(post.author.toString() !== userId) return res.status(403).json({message:'No estas autorizado', success: false})
        
        //Eliminar post
        await post.findByIdAndDelete(postId);

        //Eliminar post del usuario
        let user = await User.findById(userId);
        user.posts = user.posts.filter(id => id.toString() !== postId)

        //Eliminar los comentarios asociados
        await Comment.deleteMany({post: postId});

        return res.status(200).json({
            success: true,
            message: 'Post eliminado'
        })
        } catch (error) {
        console.log(error)
    }
};

export const bookmarkPost = async(req, res) =>{
    const { postId } = req.params;
    const userId = req.user.id;
    try {
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Posteo no encontrado', success: false});

        const user = await User.findById(userId);
        if(user.bookmarks.includes(post._id)){
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'unsaved',success: true, message:'Post removido'})
        }else{
            await user.updateOne({$addToSet:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'saved',success: true, message:'Post guardado'})
        }
    } catch (error) {
        console.log(error)
    }
}