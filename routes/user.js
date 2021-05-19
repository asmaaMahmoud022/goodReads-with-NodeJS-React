const jwt = require('jsonwebtoken')
const express = require('express')
const jwt_functions = require("../middlewares/auth")
const dotenv = require('dotenv')
const upload = require('../middlewares/image')
const UserModel = require('../models/user')
const router = express.Router();
dotenv.config()

const accessTokenSecret = 'youraccesstokensecret'


router.post("/login", async (req, res) => {
    console.log(req.body);
    const user = await UserModel.findOne({email: req.body.email})
    console.log(user);
    if(user == null){
        return res.status(400).json({token:""})
    }
    try {
        if(await bcrypt.compare(req.body.password, UserModel.password)){
            const token = jwt_functions.generateAccessToken({ email: req.body.email });
            console.log(token);
            res.json({token});
        }else{
            res.send("wrong mail or password")
        }
    } catch (error) {
        res.status(500).json({token:""})
    }
})

router.post('/admin/login', (req, res) => {
    const { username, password } = req.body
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const accessToken = jwt.sign({ username: username, isAdmin: true }, accessTokenSecret, { expiresIn: '365d' });
        return res.json({
            message: 'Admin Logged in Successfully',
            token: accessToken
        });
    } else {
        return res.status(401).send({ message: 'Login Failed !!' })
    }
});



router.post('/signup', upload.single('image'), (req, res, next) => {

    UserModel.findOne({ firstName: req.body.firstName, lastName: req.body.lastName }).then(author => {

    // if (user) 
    //     return res.status(400).json({ name: 'Your Author is already exists !' });
    
    // else{
        const User = new UserModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password ,
            image: req.file.path || 'No photo till the moment'
        });

        User.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "User Was Created Successfully..",
        });
    }).catch(err => {
        console.log("You got an error : " + err);
        res.status(500).json({error: err})
        });
//}
    })

});


router.get('/all', async(req, res, next) => {
    try {
        const users = await UserModel.find({})
        return res.json(users)
    } catch (err) {
        next(err)
    }
})

module.exports = router;