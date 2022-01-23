const db = require('../models')
const { Schema } = require('../constants/database-schema')

module.exports.getUser = (id) => {
     return db[Schema.USER].findOne({
          where: { id },
     })
}

module.exports.getAllUser = () => {
     return db[Schema.USER].findAll({
     })
}

module.exports.createUser = (info) => {
     return db[Schema.USER].create(info)
}

module.exports.updateUser = (id, info) => {
     return db[Schema.USER].update(info, {
          where: { id }
     })
}

module.exports.removeUser = (id) => {
     return db[Schema.USER].destroy({
          where: { id }
     })
}

