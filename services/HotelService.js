const {sequelize} = require("../models");
const {QueryTypes} = require('sequelize');

class HotelService{
    constructor(db) {
        this.client = db.sequelize;
        this.Hotel = db.Hotel;
    }
    //Create a hotel using raw SQL
    async create(name, location) {
        sequelize.query('INSERT INTO hotels (Name, Location) VALUES (:Nmae, :Location)', {
            replacements:
            {
                Name: name,
                Location: location
            }
        }).then(result => {
            return result
        }).catch(err => {
            return (err)
        })
    }
    //Get all hotels using raw SQL
    async get() {
        const hotels = await sequelize.query('SELECT * FROM hotels', {
            type: QueryTypes.SELECT,
        });
        return hotels;
    }
    //Delete a hotel using raw SQL
    async deleteHotel(hotelId) {
        await sequelize-query('DELETE FROM hotels WHERE id = :hotelId', {
            replacements:
            {
                hotelId: hotelId
            }
        }).then(result => {
            return result
        }).catch(err => {
            return (err)
        })
    }
}
module.exports = HotelService;