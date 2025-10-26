var express = require('express');
var router = express.Router();
var db = require("../models");
var UserService = require("../services/UserService")
var userService = new UserService(db);
var { canSeeUserList, canSeeUserDetails, checkIfAuthorized, isAdmin } = require("./authMiddleware")
var bodyParser = require('body-parser');
const { isDataURI } = require('validator');
var jsonParser = bodyParser.json()
var createError = require ('http-errors');


/* GET users listing. */
router.get('/:userId', canSeeUserDetails, async function(req, res, next) {
  const user = await userService.getOne(req.params.userId);
  
  if(user === null ) {
    next(createError(404));
    return;
  }
  res.render('userDetails', { user: user });
});

router.get('/', canSeeUserList, async function(req, res, next) {
  const users = await userService.getAll();
  res.render('users', {users: users});
});

//Delete
router.delete('/', checkIfAuthorized, isAdmin, jsonParser, async function(req, res, next) {
  let id = req.body.id;
  await userService.deleteUser(id);
  res.end()
});

module.exports = router;