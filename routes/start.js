var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var db = require('../models');
var UserService = require('../services/UserService');
var userService = new UserService(db);
var HotelService = require('../services/HotelService');
var hotelService = new HotelService(db);

router.get('/', async function(req, res, next) {
  if (req.user) {
    const user = await userService.getOne(req.user.id);
    if (user == null) {
      next(createError(404));
      return;
    }
    res.render('userDetails', { user: user });
  }
  else {
    const rate = await hotelService.getBestRate();
    if (rate == null) {
      next(createError(404));
      return;
    }
    const hotel = await hotelService.getHotelDetails(rate.HotelId, null);
    if (hotel == null) {
      next(createError(404));
      return;
    }
    res.render('hotelDetails', { hotel: hotel, user: req.user });
  }
});

module.exports = router;