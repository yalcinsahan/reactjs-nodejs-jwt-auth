import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import dataRoutes from './routes/dataRoutes.js'

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/react-node-auth",
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(()=>app.listen(8000))
.catch((err)=>console.log(err));

app.get("/",(req,res)=>res.send("anasayfa"))

app.use(authRoutes)
app.use(dataRoutes)

