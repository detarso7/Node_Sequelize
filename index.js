const express = require('express')
const app = express()
const port = 3000
const conn = require('./db/conn')
const exphbs = require('express-handlebars')


app.use(
    express.urlencoded({
      extended: true,
    }),
  )
app.use(express.json())

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/', function (req, res) {
  res.render('home')
})

app.listen(port, ()=>{
    console.log('Aplicação funcionando na porta 3000')
})