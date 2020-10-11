//Express Server
var script = require('./scripts/script')

const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors())

//Handles Post Request
app.post('/', (req, res) => {
  console.log("Executing request...");
  script.getCharacterDetails(req.query.data, res);
})

//Server Listening On Respective Port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})