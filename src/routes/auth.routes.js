import { Router } from "express";
import { UserModel } from "../dao/models/user.model.js";
import passport from "passport";



const router = Router();


//registrar
router.post("/signup", passport.authenticate("signupStrategy",{
    failureRedirect:"/api/sessions/failure-signup"
}), (req,res)=>{
    res.redirect("/products");
});

router.get("/failure-signup", (req,res)=>{
    res.send(`<div>Error al registrar al usuario, <a href="/signup">Intente de nuevo</a></div>`);
});


//login
router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/api/sessions/failure-login"
}), (req,res)=>{
    res.redirect("/products");
});

router.get("/failure-login", (req,res)=>{
    res.send(`<div>Error al loguear al usuario, <a href="/login">Intente de nuevo</a></div>`);
});

//logOut
router.post('/logout', (req, res) =>{
    req.session.destroy(error =>{
        if(error) return res.send(`Error! user not deslogin ${error}`)
        res.redirect('/login')
    }) 
})



export {router as AuthRouter}