const express = require('express')
const morgan = require('morgan')

const app = express()

const port = 3000

app.use(morgan('tiny'))

// app.use(express.static('public/'));
console.log(__dirname + '/build/')
app.use(express.static(__dirname + '/../build'));

app.get('/', (req, res) => {

    // res.send('Hello World!')
    // console.log(req)
  })
  
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
