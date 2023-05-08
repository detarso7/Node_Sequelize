const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('sequelize', 'root', 'Moscas@132', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Sequelize conectado com sucesso')
} catch (error) {
    console.log('Aconteceu algum erro', error)
}

module.exports = sequelize