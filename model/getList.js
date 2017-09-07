var sqlite = require('sqlite3').verbose()

var db = new sqlite.Database('./db/hw.db')

var op = {}

op.getBlogList = () => {
  return new Promise((resolve, reject) => {
    db.all('Select students.id, students.name, blogurl.url, blogurl.time From blogurl, students Where blogurl.id = students.id', function(err, row) {
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
  })
}

module.exports = op
