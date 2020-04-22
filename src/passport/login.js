const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const User = require('../models/user');
const crypt = require('md5');

passport.serializeUser((user, done)=>{
  done(null,user.id);
});


passport.deserializeUser(async(id, done)=>{
 const user = await User.findById(id);
 done(null, user);
});
passport.use('local-singup', new localStategy(
    {
      usernameField:'email',
      passwordField: 'password',
      passReqToCallback: true  
    }, async (req, email, password, done)=>{
        const user = await User.findOne({email:email});
        if(user){
          return done(null, false)
        }else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = crypt(password);
        newUser.save()
        .then(done(null, newUser))
        .catch(err => console.log(err))
         
        }
    }
)) //Metodo de logeo

passport.use('local-singin', new localStategy(
  {
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true  
  }, async (req, email, password, done)=>{
      const user = await User.findOne({email:email, password: crypt(password)});
      if(!user){
        return done(null, false)
      }else {
        
       done(null, user);
      }
  }
))