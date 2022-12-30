const express = require('express')
const cors = require('cors')
var corsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'POST','DELETE','UPDATE','PUT','PATCH']
}

const app = express(cors(corsOptions))

app.options(
  '*',
  cors(corsOptions)
);
const port = 3000

app.get('/', cors(), (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})