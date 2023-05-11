const express = require('express')
const app = express()
const port = 3000
const conn = require('./db/conn')
const User = require('./models/User')
const Address = require('./models/Address')

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

// GET EDIT
app.get('/users/edit/:id', async (req, res) =>{
    const id = req.params.id

    const user = await User.findOne({raw: true, where: {id: id}})

    res.render('editusers', {user})
})


// DELETE
app.post('/users/delete/:id', async(req, res)=>{
    const id = req.params.id

    await User.destroy({where: {id}})
    res.redirect('/')
})

 //GET ADDRESS
 app.get('/users/edit/:id', async (req, res) =>{

    const id = req.params.id

    try {

        const user = await User.findOne({include: Address, where: {id: id}})
        console.log(user)
    
        res.render('editusers', {user: user.get({plain: true})})
        
    } catch (error) {
        console.log(error)
    }

})

// UPDATE
app.post('/users/update/', async(req, res)=>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation 
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    const userData = {id, name, occupation, newsletter}

    await User.update(userData, {where: {id}})
    res.redirect('/')
})


// EDDRESS -------------------------------------------------------------

app.post('/address/create', async(req, res)=>{
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {UserId, street, number, city}

    console.log(address)

    await Address.create(address)

    res.redirect(`/users/edit/${UserId}`)

})


// HOME -------------------------------------------------------------

app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})

    res.render('home', {users})
})

conn
.sync()
//.sync({force: true})
.then(()=>{
    app.listen(port, ()=>{
        console.log('Aplicação funcionando na porta 3000')
    })
}).catch((err)=>{
    console.log(err)
})