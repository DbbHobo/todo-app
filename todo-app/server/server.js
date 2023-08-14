const PORT = process.env.PORT ?? 8000
const express = require("express")
const cors = require("cors")
const connection = require("./db")
const app = express()
const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

app.use(cors())
app.use(express.json())

// 查询
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params

  try {
    const todos = await connection("SELECT * FROM todos WHERE user_email = ?", [
      userEmail,
    ])
    res.json(todos)
  } catch (error) {
    console.error(error)
  }
})

// 增加
app.post("/todos", async (req, res) => {
  const { user_email, title, progress, date } = req.body
  const id = uuidv4()
  console.log(id, user_email, title, progress, date)
  try {
    const newTodo = await connection(
      "INSERT INTO todos (user_email,title,progress,create_date) VALUES (?,?,?,?)",
      [user_email, title, progress, date]
    )
    res.json(newTodo)
  } catch (error) {
    console.error(error)
  }
})

// 编辑
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params
  const { user_email, title, progress, date } = req.body
  console.log(id, user_email, title, progress, date)
  try {
    const editTodo = await connection(
      "UPDATE todos SET user_email = ?, title = ?,progress = ?,create_date = ? WHERE id = ?",
      [user_email, title, progress, date, id]
    )
    res.json(editTodo)
  } catch (error) {
    console.error(error)
  }
})

// 删除
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const deleteTodo = await connection("DELETE FROM todos WHERE id = ?", [
      parseInt(id),
    ])
    res.json(deleteTodo)
  } catch (error) {
    console.error(error)
  }
})

// 注册
app.post("/signup", async (req, res) => {
  const { email, password } = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    const addUser = await connection(
      "INSERT INTO users (email, hashed_password) VALUES (?,?)",
      [email, hashedPassword]
    )
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" })
    res.json({ email, token })
  } catch (error) {
    console.error("出错啦", error)
    res.json({ detail: error.sqlMessage })
  }
})

// 登录
app.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const checkUser = await connection("SELECT * FROM users WHERE email = ?", [
      email,
    ])
    if (!checkUser.length) return res.json({ detail: "User do not exsit" })
    let matched = await bcrypt.compare(password, checkUser[0].hashed_password)
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" })

    if (matched) {
      res.json({ email: checkUser[0].email, token })
    } else {
      res.json({ detail: "Password is invalid" })
    }
  } catch (error) {
    console.error(error)
  }
})

app.listen(PORT, () => console.log(`Sever is running on PORT ${PORT}`))
