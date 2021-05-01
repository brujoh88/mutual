require('./config/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

//=================================================
/* Para que no aparesca esto
!(node:10712) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
!(Use `node --trace-deprecation ...` to show where the warning was created)
*/
mongoose.set('useCreateIndex', true)

//! (node:15695) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.set('useFindAndModify', false)

//=================================================

const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded========
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json=====================
app.use(bodyParser.json())

const route = require('./network/routes')
const port = process.env.PORT
const cors = require('cors')

app.use(express.static(__dirname + '/dist'))
app.use(cors())

route(app)

mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) throw err
    console.log('Base de datos online')
  }
)

app.listen(port, () =>
  console.log(`La app esta escuando en la URL http://localhost:${port}`)
)
