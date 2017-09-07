var sqlite = require('sqlite3').verbose()

var db = new sqlite.Database('./db/hw.db')

var op = {}

var checkID = function (id, password) {
  return new Promise((resolve, reject) => {
    db.get('Select * From students Where id=?', [id], function (err, row) {
      if (err) {
        console.log(err)
        return reject(err)
      }
      if (row) {
        if (row.password === null) {
          var cryptoPassword = require('crypto').createHash('md5').update(password).digest('hex')
          db.run('Update students Set password = ? Where id = ?', [cryptoPassword, id], function() {
            return resolve(true)
          })
        } else {
          if (row.password === require('crypto').createHash('md5').update(password).digest('hex')) {
            return resolve(true)
          } else {
            return resolve(false)
          }
        }
      } else {
        return resolve(false)
      }
    })
  })
}

var getTime = function () {
  var d = new Date()
  var localTime = d.getTime()
  var localOffset = d.getTimezoneOffset() * 60000
  var UTC = localTime + localOffset
  var offset = 8 // 东八区
  d = new Date(offset * 3600000 + UTC)
  return d.getFullYear() + '-' +
          (((d.getMonth() + 1) > 10) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '-' +
          (((d.getDate()) > 10) ? (d.getDate()) : ('0' + (d.getDate())))
}

op.addUrl = function (id, url, password) {
  return new Promise(async (resolve, reject) => {
    console.log('111')
    if (!id || !url || !password) {
      return resolve(false)
    }
    var time = getTime()
    console.log(time)
    var ret = await checkID(id, password)
    if (!ret) {
      console.log('Can not find match id with password in students table.')
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
