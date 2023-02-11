import fastify from 'fastify'
import { Launcher, wsConnection } from '../connection';
const DEBUG_NUMBER = '554599847520@s.whatsapp.net'

interface IQuerystring {
  name: string,
  timestamp: any
}

interface IHeaders {
  'h-Custom': string;
}

interface IParams {
  object: any,
  jid: string
}

const server = fastify()

server.get('/ping', () => {
  return 'oi anaaaaa'
})

server.post<{
  Headers: IHeaders,
  Querystring: IQuerystring
}>('/teste', async (request, response) => {
  const { name, timestamp } = request.query
  wsConnection?.sendMessage('554599847520@s.whatsapp.net', {
    text: `
    ${name},
    sended in: ${(Date.now() / 1000) - (Number(timestamp) / 1000)} segs
    `
  })
  return 'ok'
})

server.post<{
  Querystring: IParams
}>('/send', async (request, res) => {
  const { jid, object } = request.query
  try {
    const parsed = JSON.parse(object)
    const response = await wsConnection?.sendMessage(jid, parsed);
    if(!response) return new Error(`we cannot send the message: ${object} to ${jid}`);
    return response
  } catch (e) {
    return await wsConnection?.sendMessage(DEBUG_NUMBER, {
      text: `${e}`
    })
  }
})

server.listen({ port: 3333 }, (err: any, address: any) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`listening on port ${address}`)
  new Launcher().buildProps();
})
// const response = await wsConnection?.relayMessage(jid, JSON.parse(object), {})
