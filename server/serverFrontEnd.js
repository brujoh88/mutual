const express = require('express')
const app = express()
const path = require('path')
const port = 5050
const history = require('connect-history-api-fallback')
const cors = require('cors')

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))

app.use(cors())

app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)

app.get('/', function(req, res) {
  res.render(path.join(__dirname + '/dist'))
})

app.listen(port, () =>
  console.log(`La app esta escuando en la URL http://localhost:${port}`)
)
