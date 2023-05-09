const express = require('express')
const app = express()
const port = 3000
const conn = require('./db/conn')
const User = require('./models/User')

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


app.get('/users/create', (req, res) =>{
    res.render('edduser')
})

app.post('/users/create', async(req, res) =>{
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({name, occupation, newsletter})

    res.redirect('/')
})

app.get('/users/:id', async (req, res) =>{
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})

    console.log(user)

    res.render('userview', {user})
})

app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})

    res.render('home', {users})
})

conn.sync().then(()=>{
    app.listen(port, ()=>{
        console.log('Aplicação funcionando na porta 3000')
    })
}).catch((err)=>{
    console.log(err)
})