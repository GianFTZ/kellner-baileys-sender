import express, { json, Router } from 'express'
import { Launcher, wsConnection } from '../connection'
import cors from 'cors'
const DEBUG_NUMBER = '554584194887@s.whatsapp.net'


const app = express()
const router = Router()
app.use(json())
app.use(cors({
    origin: '*'
}));
router.get('/ping', (req, res) => {
  res.json("its running bitch")
})
router.post('/', async (req, res) => {
	console.log(req.body)
  const { jid, object } = req.body
  try {
    const parsed = JSON.parse(object)
	   console.log(parsed)
    const response = await wsConnection?.sendMessage(jid, parsed);
    if(!response) return new Error(`we cannot send the message: ${object} to ${jid}`);
    res.json("success")
    return response
  } catch (e){
	  res.json("error")
    return await wsConnection?.sendMessage(DEBUG_NUMBER, {
      text: `${e}`
    })
  }
})
app.use(router)
app.listen(3333, () => {
  console.log("app is listening on 3333")
  new Launcher().buildProps()
})
