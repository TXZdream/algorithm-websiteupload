var sqlite = require('sqlite3').verbose()

var db = new sqlite.Database('./db/hw.db')

var op = {}

var checkID = function (id) {
  return new Promise((resolve, reject) => {
    db.get('Select * From students Where id=?', [id], function (err, row) {
      if (err) {
        console.log(err)
        return reject(err)
      }
      if (row) {
        return resolve(true)
      } else {
        return resolve(false)
      }
    })
  })
}

op.addUrl = function (id, url) {
  return new Promise(async (resolve, reject) => {
    var d = new Date()
    var time = d.toISOString().slice(0, 10)
    var ret = await checkID(id)
    if (!ret) {
      return resolve(false)
    } else {
      db.run('Insert Into blogurl Values(?, ?, ?)', [id, url, time], function (err) {
        if (err) {
          return resolve(false)
        } else {
          console.log('Insert new record.')
          return resolve(true)
        }
      })
    }
  })
}

module.exports = op
