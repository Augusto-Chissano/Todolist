require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./database/db')
const userRoutes = require('./routes/user')


const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Welcome!</h1>')
})
app.use(userRoutes)


//O servidor vai ao ar assim que a base de dados estiver disponivel
db().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port: ${process.env.PORT}`)
    })
}).catch((err) => console.log(`Ocorreu uma falha ao tentar conectar-se ao database: ${err}`))
