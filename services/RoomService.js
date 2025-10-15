const {sequelize} = require("../models");
const {QueryTypes} = require('sequelize');

class RoomService {
    constructor(db) {
        this.client = db.sequelize;
        this.Room = db.Room;
        this.Reservation = db.Reservation;
        this.User = db.User;
        this.Hotel = db.Hotel;
    }
    //Get all rooms using raw SQL
    async get() {
        return this.Room.findAll({
            where: {},
            include: [{
                model: this.User,
                through: {
                    attributes: ['StartDate', 'EndDate']
                }
            },
            {
                model: this.Hotel
            }]
        })
    }
    //Create a room using raw SQL
    async create(capacity, pricePerDay, hotelId) {
        sequelize.query('INSERT INTO rooms (Capacity, PricePerDay, HotelId) VALUES (:Capacity, :PricePerDay, : HotelId)', {
            replacements:
            {
                Capacity: capacity,
                PricePerDay: pricePerDay,
                HotelId: hotelId
            }
        }).then(result => {
            return result
        }).catch(err => {
            return (err)
        })
    }
    //Get all rooms for a specific hotel using raw SQL
    async getHotelRooms(hotelId) {
        return this.Room.findAll({
            where: {
                HotelId: hotelId
            },
            include: [{
                model: this.User,
                through: {
                    attributes: ['StartDate', 'EndDate']
                }
            },
            {
                model: this.Hotel
            }]
        })
    }

    //Delete a room using raw SQL
    async deleteRoom(roomId) {
        await sequelize.query('DELETE FROM rooms WHERE id = :roomId', {
            replacements:
            {
                roomId: roomId
            }
        }).then(result => {
            return result
        }).catch(err => {
            return (err)
        })
    }
    //Rent a specified room using raw SQL
    async rentARoom(userId, roomId, startDate, endDate) {
    sequelize.query('INSERT INTO reservations (StartDate, EndDate, RoomId, UserId) VALUES (:StartDate, :EndDate, :RoomId, :UserId)', {
        replacements:
        {
            StartDate: startDate,
            EndDate: endDate,
            RoomId: roomId,
            UserId: userId
        }
    }).then(result => {
        return result
    }).catch(err => {
        return (err)
    })
  }
}

module.exports = RoomService;