const express = require("express")
const router = express.Router();

const {authMiddleware} = require("../middlewares/auth-middleware")
const {Person, User,Order, Cart, Mobile} = require("../models")

module.exports = router;

