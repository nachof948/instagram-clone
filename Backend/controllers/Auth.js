import { User } from '../models/User.js'
import { Post } from '../models/Post.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const register = async (req, res) =>{
    const { username, email, completeName , password } = req.body
    try {
        if(!username || !email || !password){
            res.status(401).json({
                message:'Falta completar algunos datos, por favor revisar',
                success: false
            })
        }
        const userEmail = await User.findOne({email});
        if(userEmail){
            res.status(401).json({
                message:'Ese email ya esta registrado',
                success: false
            })
        }
        const userName = await User.findOne({username});
        if(userName){
            res.status(401).json({
                message:'Ese nombre de usuario no esta disponible',
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username, email, completeName, password: hashedPassword
        })
        
        const token = jwt.sign({email: newUser.email, id: newUser._id}, process.env.KEY_TOKEN)
        const expiresData = new Date();
        expiresData.setDate(expiresData.getDate() + 7);

        return res.status(200).cookie('access_token', token, {
            httpOnly: true,
/*             secure: process.env.NODE_ENV === 'production',
            sameSite: 'None', */
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
        }).json({
            newUser,
            message: `Bienvenido/a ${newUser.username}`,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req, res)=>{
    const { email, password } = req.body
    try {
        let user = await User.findOne({email})

        if (!user) {
            return res.status(404).json({success: false, message: 'Email o Contraseña invalida' });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        
        if (!isPasswordCorrect) {
            return res.status(404).json({success: false, message: 'Email o Contraseña invalida' });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.KEY_TOKEN,
            { expiresIn: '7d' }
        );

        const populatedPosts = await Promise.all(
            user.posts.map(async (postId) =>{
                const post = await Post.findById(postId)
                if(post.author.equals(user._id)){
                    return post;
                }
                return null;
            })
        )
        
        user={
            _id: user._id,
            username: user.username,
            email: user.email,
            completeName: user.completeName,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: populatedPosts
        }
        res.cookie('access_token', token, {
            httpOnly: true,
/*             secure: process.env.NODE_ENV === 'production',
            sameSite: 'None', */
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
        }).status(200).json({user, message:`Bienvenido/a ${user.username}`, success:true});
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (_, res)=>{
    try {
        res.clearCookie('access_token')
        res.status(200).json({ success: true, message: 'Usuario deslogueado'})
    } catch (error) {
        console.log(error)
    }
}

