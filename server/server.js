const express = require('express')
const app = express()
const route = require('./network/routers')
const port = 3000
const cors = require('cors')

app.use(express.static(__dirname + '/dist'))
app.use(cors())

route(app)

app.listen(port, () =>
  console.log(`La app esta escuando en la URL http://localhost:${port}`)
)
