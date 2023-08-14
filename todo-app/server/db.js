const mysql = require("mysql")
const util = require("util")
require("dotenv").config()

const conn = mysql.createConnection({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "TODO",
})
const connection = util.promisify(conn.query).bind(conn)

module.exports = connection
