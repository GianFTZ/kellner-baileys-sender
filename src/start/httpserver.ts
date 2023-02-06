import fastify from 'fastify'
import { Launcher, wsConnection } from '../connection';

interface IQuerystring {
  name: string,
  timestamp: any
}

interface IHeaders {
  'h-Custom': string;
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
  wsConnection?.sendMessage('554591253370@s.whatsapp.net', {
    text: `
    ${name},
    sended in: ${(Date.now() / 1000) - (Number(timestamp) / 1000)} segs
    `
  })
  return 'ok'
})

server.listen({ port: 3333 }, (err: any, address: any) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`listening on port ${address}`)
  new Launcher().buildProps();
})