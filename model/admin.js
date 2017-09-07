var sqlite = require('sqlite3').verbose()

var db = new sqlite.Database('./db/hw.db')

var op = {}

op.addUserMessage = function (id, name) {
  return new Promise((resolve, reject) => {
    db.run('Insert Into students Values(?, ?, ?)', [id, name, null], function () {
      return resolve(true)
    })
  })
}

module.exports = op
