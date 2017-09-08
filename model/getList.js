var sqlite = require('sqlite3').verbose()

var db = new sqlite.Database('./db/hw.db')

var op = {}

op.getBlogList = (body) => {
  return new Promise((resolve, reject) => {
    if (!body.date && !body.id) {
      db.all('Select students.id, students.name, blogurl.url, blogurl.time From blogurl, students Where blogurl.id = students.id Order By blogurl.time Desc', function (err, row) {
        if (err) {
          console.log(err)
          return resolve({
            status: false
          })
        } else {
          return resolve({
            status: true,
            data: row
          })
        }
      })
    } else if (body.date) {
      db.all('Select students.id, students.name, blogurl.url, blogurl.time From blogurl, students Where blogurl.id = students.id And blogurl.time = ?', [body.date], function (err, row) {
        if (err) {
          console.log(err)
          return resolve({
            status: false
          })
        } else {
          return resolve({
            status: true,
            data: row
          })
        }
      })
    } else if (body.id) {
      db.all('Select students.id, students.name, blogurl.url, blogurl.time From blogurl, students Where blogurl.id = students.id And blogurl.id = ? Order By blogurl.time Desc', [body.id], function (err, row) {
        if (err) {
          console.log(err)
          return resolve({
            status: false
          })
        } else {
          return resolve({
            status: true,
            data: row
          })
        }
      })
    } else {
      return resolve({
        status: false
      })
    }
  })
}

module.exports = op
