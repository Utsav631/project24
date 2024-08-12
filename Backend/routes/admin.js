const express = require('express');
const router = express.Router();

const { createQuestion } = require('../controllers/createQuestion');
const { getQuestions } = require('../controllers/getQuestions');
const { updateQuestion } = require('../controllers/updateQuestion');
const { deleteQuestion } = require('../controllers/deleteQuestion');





const {login,signup}=require("../controllers/Auth");
const {auth,isStudent,isAdmin}=require("../middlewares/auth");

router.post('/createQuestion', createQuestion);
router.get('/getQuestions', getQuestions);
router.put('/updateQuestion/:id', updateQuestion);
router.delete('/deleteQuestion/:id', deleteQuestion);




router.post("/signup",signup);
router.post("/login",login);
// preotected route
router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        sucess : true,
        message :"welcome to protected route for student" ,
    })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        sucess : true,
        message :"welcome to protected route for admin" ,
    })
})

module.exports = router;