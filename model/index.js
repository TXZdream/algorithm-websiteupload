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

var getTime = function () {
  var d = new Date()
  return d.getFullYear() + '-' +
          (((d.getMonth() + 1) > 10) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '-' +
          (((d.getDate()) > 10) ? (d.getDate()) : ('0' + (d.getDate())))
}

op.addUrl = function (id, url) {
  return new Promise(async (resolve, reject) => {
    var d = new Date()
    var time = getTime()
    console.log(time)
    var ret = await checkID(id)
    if (!ret) {
      return resolve(false)
    } else {
      db.run('Insert Into blogurl Values(?, ?, ?)', [id, url, time], function (err) {
        if (err) {
          console.log('Insert new record fail.')
          console.log(err)
          return resolve(false)
        } else {
          console.log('Insert new record success.')
          return resolve(true)
        }
      })
    }
  })
}

module.exports = op
