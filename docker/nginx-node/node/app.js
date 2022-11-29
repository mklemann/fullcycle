const { query } = require('./repositories/mysql')
const nameRandom = require('node-random-name')
const express = require('express')
const app = express()

app.get('/', async (_req, res) => {
  console.log('object');
  const name = nameRandom()
  await query(`INSERT INTO peoples(name) values('${name}')`)

  const getPeoples = await query(`SELECT * FROM peoples`)
  console.log(getPeoples)
  console.log(getPeoples[0])

  const text = getPeoples.reduce((acc, current) => {
    return acc + `<li>${current.name}</li>`
  }, '')

  res.send(`<h1>Full Cycle Rocks!</h1> </br> <h2><ul>${text}</ul></h2>`)
})

app.listen(3003, async () => { await query(`CREATE TABLE IF NOT EXISTS peoples(id int not null auto_increment, name VARCHAR(50), primary key (id));`) })
