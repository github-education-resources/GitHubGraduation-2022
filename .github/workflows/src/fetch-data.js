if(!process.env.GITHUB_ACTIONS) {
  const result = require('dotenv').config()

  if (result.error) {
    throw result.error
  }
}

const airtable = require('./app/airtable.js');
const fs = require('fs')

;(async ()=>{
  const grad2020 = await airtable.fetchAll2020()
  const grad2021 = await airtable.fetchAll2021()
  const grad2022 = await airtable.fetchAll2022()
  const content = JSON.stringify({grad2020, grad2021, grad2022})
  fs.writeFileSync('./app/data/airtable.json', content)
})()
