const Airtable = require('airtable')
const fs = require('fs')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_SECRET
});

const GITHUB_GRADUATION = "appnpTfSaHWAf964L"
const GRADUATES_2020 = "Graduation 2020"
const GRADUATES_2021 = "Graduation 2021"

let cachedJson
let cachedData = {}

try {
  cachedJson = fs.readFileSync('./app/data/airtable.json', 'utf8')
  cachedData = JSON.parse(cachedJson)
} catch(err) {
  console.log("Failed to parse cache", err)
}


class ATable {
  constructor() {

  }

  userParticipated2020(githubLogin) {
    const data = this.fetchFromCache(githubLogin, GRADUATES_2020)

    if(data) {
      console.log("found cached 2020 data")
      return Promise.resolve(data)
    }

    return this.fetchGraduate(githubLogin, GRADUATES_2020)
  }

  fetch2021Graduate(githubLogin) {
    const data = this.fetchFromCache(githubLogin, GRADUATES_2021)
    if(data) {
      console.log("found cached 2021 data")
      return Promise.resolve(data)
    }

    return this.fetchGraduate(githubLogin, GRADUATES_2021)
  }

  async fetchAll(table) {
    const airtable = Airtable.base(GITHUB_GRADUATION);
    const users = {}

    return new Promise((resolve, reject)=>{
      airtable(table).select().eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          users[record.fields["GitHub Username"]] = record.fields
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

      }, function done(err) {
          if (err) {
            console.error(err);
            reject(err)
          }
          resolve(users)
      });
    })
  }

  async fetchAll2021() {
    return await this.fetchAll(GRADUATES_2021)
  }

  async fetchAll2020() {
    return await this.fetchAll(GRADUATES_2020)
  }

  fetchFromCache(githubLogin, table) {
    let data

    if(table === GRADUATES_2020) {
      data = cachedData["grad2020"]
    } else if(table === GRADUATES_2021) {
      data = cachedData["grad2021"]
    }

    if(data) {
      return data[githubLogin]
    }
  }

  fetchGraduate(githubLogin, table) {
    const airtable = Airtable.base(GITHUB_GRADUATION);
    const data = []
    return new Promise((resolve, reject)=>{
      airtable(table).select({
        // Selecting the first 3 records in Pending Reviews:
        maxRecords: 1,
        filterByFormula: `{GitHub Username} = '${githubLogin}'`
        // view: "Pending Reviews",
        // filterByFormula: `{GitHub Username} = '${}'`
      }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
          data.push(record.fields)
        });

        fetchNextPage()
      }, function done(err) {
        if (err) {
          if(err.error === "NOT_FOUND") {
            resolve(false)
          }

          reject(err)
          return;
        }

        resolve(data[0])
      });

    }).catch((err)=>{
      reject(err)
    })
  }
}

module.exports = new ATable()
