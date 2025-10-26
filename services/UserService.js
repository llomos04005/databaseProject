const { Op } = require("sequelize");

class UserService {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.User;
    this.Room = db.Room;
    this.Hotel = db.Hotel;
    this.Reservation = db.Reservation;
  }

  async create(firstName, lastName, username, salt, encryptedPassword) {
    return this.User.create(
      { FirstName: firstName, LastName: lastName, Username: username, Salt: salt, EncryptedPassword: encryptedPassword }
    ).catch(function (err) { console.log(err); });
  }

  async getAll() {
    return this.User.findAll({ where: {} })
      .catch(function (err) { console.log(err); });
  }

  async getOne(userId) {
    return await this.User.findOne({
      where: { id: userId },
      include: {
        model: this.Room,
        through: { attributes: ['StartDate', 'EndDate'] },
        include: { model: this.Hotel }
      }
    }).catch(function (err) { console.log(err); });
  }

  async getOneByName(username) {
    return await this.User.findOne({
      where: { username: username },
      include: {
        model: this.Room,
        through: { attributes: ['StartDate', 'EndDate'] },
        include: { model: this.Hotel }
      }
    }).catch(function (err) { console.log(err); });
  }

  async deleteUser(userId) {
    return this.User.destroy({
      where: {
        id: userId,
        Role: { [Op.not]: 'Admin' }
      }
    }).catch(function (err) { console.log(err); });
  }
}
module.exports = UserService;