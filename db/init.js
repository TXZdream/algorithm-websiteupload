var sqlite3 = require('sqlite3').verbose()
var readline = require('linebyline')

var db = new sqlite3.Database('./db/hw.db')

db.serialize(() => {
  db.run('PRAGMA foreign_keys=ON', function () {
    db.run('Create Table if not exists students(id char(8), name char(20), Primary Key(id))', function () {
      var nameList = readline('./db/name.txt')
      nameList.on('line', async function (data, linecount) {
        var [id, name] = data.split(' ')
        db.run('Insert Into students Values(?, ?)', [id, name])
      })
    })
    db.run('Create Table if not exists blogurl(id char(8), url varchar(200), time char(10), Primary Key(id, url))')
  })
})
