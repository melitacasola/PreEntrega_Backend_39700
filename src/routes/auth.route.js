import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";


const router = Router();

// ROUTES AUTH
//sing ip 
router.post('/signup', async (req, res) => {
    const { username, pass } = req.body;
    
    try {
        const userExists = await UserModel.findOne({ username })
        //verif si existe el user
        if (userExists) {
            return res.send(`Usuario ya registrado <a href="/login">Incia sesion</a>`);
        }

        if (username === 'adminCoder@coder.com' && pass === 'adminCod3r123') {
            const newUser = await UserModel.create({ username, pass, rol: 'admin' })
            req.session.user = newUser.username;
        } else {
            const newUser = await UserModel.create({ username, pass, rol: 'usuario' })
            req.session.user = newUser.username;
        }
        // res.send('user registrado con exito')
        return res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    const { username, pass } = req.body;
    const user = await UserModel.findOne({ username});
    console.log(req.session)
    
    if (!user) {
        return res.send(`Error! user not exists... <a href="/signup">registrarse</a>`);
    }

    if (pass === user.pass) {
        req.session.user = username;

        console.log(req.session)
        res.redirect('/products')
    } else{
        res.send('dates invalided')
    }

});

router.post('/logout', (req, res) =>{
    req.session.destroy(error => {
        if (error) {
            return res.send ("no se pudo cerrar la sesion");
        } else {
            return res.redirect("/login");
        }
    });
})




function auth(req, res, next){
    const user =  UserModel.findOne({ username});
    const password = UserModel.findOne({pass});
    if(req.session?.user == user && req.session?.password){
        return next()
    }
    return res.status(401).send('error de auth')
}




export { router as AuthRouter };

// import { Router } from "express";
// import { UserModel } from "../dao/models/user.model.js";

// const AuthRouter = Router();


// //register
// AuthRouter.post("/signup", async(req, res)=>{
//     try {
//         const {email, password} = req.body;
//         const user = await UserModel.findOne({email:email});
//         if (!user) {
//             const newUser = await UserModel.create({email, password});
//             req.session.user = newUser.email;
//             req.session.rol = "user";
//             if (email = "adminCoder@coder.com") {
//                 req.session.rol = "admin";
//                 console.log(req.session);
//             }
//             //ejemplo a profile en este caso va a products
//             return res.redirect("/products");
//         } else {
//             res.send(`Usuario ya registrado <a href="/login">Iniciar sesion </a>`)
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });
// //login
// AuthRouter.post("/login", async (req,res) => {
//     const {email, password} = req.body;
//     const authorized = await UserModel.findOne({email:email,password:password});
//     if(!authorized){
//         res.send("ususario no identificado");
//     }else{
//         if (email === "adminCoder@coder.com") {
//             req.session.user = email;
//             req.session.rol = "admin";
//             console.log(req.session);
//         }else{
//             req.session.user = email;
//         req.session.rol = "user";
//         }
//         return res.redirect("/products");
//     }  
    
// })

// //logOut
// AuthRouter.post("/logout", (req,res) =>{
//     req.session.destroy(error => {
//         if (error) {
//             return res.send ("no se pudo cerrar la sesion");
//         } else {
//             return res.redirect("/login");
//         }
//     });
// });

// export {AuthRouter}