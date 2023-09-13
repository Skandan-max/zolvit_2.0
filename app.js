const express = require("express")
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars")
const nodemailer = require("nodemailer")
const path = require("path")
const bodyParser = require("body-parser")
const { error } = require("console")

const app = express()

app.engine("handlebars", engine())
app.set("view engine", "handlebars")

app.use("/public", express.static(path.join(__dirname, "public")))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
	res.render("form")
})

app.post("/send", (req, res) => {
	const output = `
   <h1> hey this is ${req.body.name}</h1>
   <h2>its fucking working</h2>
   `

	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: "skandan2003@gmail.com",
			pass: "qpzfqnpeispekwzh",
		},
		tls: {
			rejectUnauthorized: false,
		},
	})

	async function main() {
		const info = await transporter.sendMail({
			from: '"Skandan" <skandan2003@gmail.com>',
			to: `${req.body.email},sadiisticseven@gmail.com`,
			subject: "its fucking wokring",
			text: "Hello ",
			html: output,
		})

		console.log("Message sent: %s", info.messageId)
		res.render("form", { msg: "Email has been sent" })
	}

	main().catch(console.error)
})

app.listen(3500, () => console.log("server started on port 3500"))
