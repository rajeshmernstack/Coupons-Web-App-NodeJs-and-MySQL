const express = require('express');
const userRouter = express.Router();

userRouter.get("/login", (req, res) => {
    res.json({status: "Login Request"});
})


module.exports = userRouter;