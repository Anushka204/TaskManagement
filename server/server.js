import express from "express"

const app = express()
const port = 3000 // You can use any port that is free on your machine

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
