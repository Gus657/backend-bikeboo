const express  = require('express');
const router  = express.Router();
const passport = require('passport');

router.get('/', (req, res, next)=>{
   res.send({
    "message": "Main Page"
}) 
});

router.get('/singup', (req, res, next)=>{
    res.send({
        "message": "SingUp"
    }) 
});

router.get('/singin', (req, res, next)=>{
    res.send({
        "message": "SingIn"
    }) 
});


router.post('/singup', passport.authenticate('local-singup',{
    successRedirect:'/profile',
    failureRedirect:'/singupError',
    passReqToCallback: true
}));
router.post('/singin', passport.authenticate('local-singin',{
    successRedirect:'/profile',
    failureRedirect:'/singinError',
    passReqToCallback: true
}));

router.get('/profile', isAuthenticated,(req, res, next)=>{
    res.send({
        "Profile": "Yeah Boy"
    }) 
});

router.get('/logout',(req, res, next)=>{
    req.logout();
    res.redirect('/');
});

function isAuthenticated(req, res, next){
    if  (req.isAuthenticated())
    {
        return next()
    }
    res.redirect('/');
}

//######################ERRORS ##############################
router.get('/singUpError', (req, res, next)=>{
    res.send({
        "message": "El correo proporcionado ya ha sido utilizado"
    }) 
});
router.get('/singinError', (req, res, next)=>{
    res.send({
        "message": "Por favor verifique el Usuario y la Contraseña"
    }) 
});

module.exports = router;