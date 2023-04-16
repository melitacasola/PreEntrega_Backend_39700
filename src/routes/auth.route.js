import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";

const router = Router();

//registrar
router.post('/signup', async(req, res) =>{
    try {
        const {user, pass} = req.body;

        const userExists = await UserModel.findOne({user})
        if(userExists){
            res.send(`Usuario ya registrado <a href="/login">Inciar sesion</a>`)
        }
        if(user === 'adminCoder@coder.com' && pass === 'adminCod3r123'){
            const newUser = await UserModel.create({user, pass, rol: 'admin'})
            req.session.user = newUser.user
        } else{
            const newUser = await UserModel.create({user, pass, rol: 'usuario'})
            req.session.user = newUser.user
        }
        // res.send('usuario registrado')
        res.redirect('/')

    } catch (error) {
        console.log(error)
    }
})

//login
router.post('/login', async(req, res) =>{
    const {user, pass } = req.body;
    const userExists = await UserModel.findOne({user})

    
    if(!userExists){
        return res.send(`Error! user not exists... <a href="/signup">registrarse</a>`)
    }
    if(pass === userExists.pass){
        req.session.user = userExists.user
        res.redirect('/products')
    }else{
        res.send('datas invalided')
    }
})

router.post('/logout', (req, res) =>{
    req.session.destroy(error =>{
        if(error) return res.send(`Error! user not deslogin ${error}`)
        res.redirect('/login')
    }) 
})



export {router as AuthRouter}