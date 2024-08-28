import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyUser = (req, res, next)=>{
    const token = req.cookies.access_token 
    if(!token){
        return res.status(401).json({message:'No esta autorizado'})
    }
    jwt.verify(token, process.env.KEY_TOKEN, (err, user) =>{
        if(err){
            return res.status(403).json({message:'Prohibido'})
        }
        req.user = user
        next()
    })
}