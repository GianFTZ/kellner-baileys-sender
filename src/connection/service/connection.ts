import { DisconnectReason, WASocket } from "@adiwajshing/baileys";
import { Boom } from '@hapi/boom'
import { IStarter, Launcher } from ".";
import env from "../../config/env";
import * as fs from 'fs'
import { DisconnectReasons } from "../error";
import { Alerts } from "../alerts";

export const eventListener = (client: WASocket, starter: IStarter, launcher: Launcher) => {
  client.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if(connection === 'close') {
          const error = lastDisconnect!.error as Boom
          const statusCode =  error?.output?.statusCode;
          lastDisconnect!.error as Boom
          const shouldReconnectArray = DisconnectReasons
          const shouldReconnect = shouldReconnectArray.includes(statusCode)
          if (shouldReconnect) {
              return launcher.buildProps();
          }
          if (statusCode == DisconnectReason.loggedOut) {
              fs.unlinkSync(env.SESSION_PATH)
              return launcher.buildProps();
          }
          Alerts.unexpectedClose(error, shouldReconnect)
          process.exit()
      } else if(connection === 'open') {
          Alerts.connectionSuccessful()
          console.log(update)
          client.sendMessage('120363046412489809@g.us', {
            text: "consumer is ready"
          })
      }
  });

  client.ev.on('creds.update', ((authCreds) => {
      starter.saveCreds!();
  }));
  return client;
}