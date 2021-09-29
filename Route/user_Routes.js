const express = require("express");
const router = express.Router();
const userModel = require("../models/user")
router.get("/list", async(req, res) => {

    const userGet = await userModel.find()
    if (userGet.err) throw new Error({ error: userGet.err })
    res.status(200).json(userGet)

})
router.post("/create", async(req, res) => {
    const body = req.body
    console.log("req", req.body)
    const user = new userModel(body.user)
    user.save(function(err, user) {
        res.status(200).json(user)
    });

})
router.post("/login", async(req, res) => {
    const body = req.body
    console.log("req", req.body)
    const findUser = userModel.findOne({ email: body.user.email, password: body.user.password })
        .then(response => res.status(200).json(response))
        .catch(error => res.status(400).json(error))

})

module.exports = router