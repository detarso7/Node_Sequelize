const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('sequelize', 'root', 'Moscas@132', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize