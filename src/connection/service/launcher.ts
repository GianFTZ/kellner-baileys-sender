import { WASocket } from "@adiwajshing/baileys";
import { eventListener, initializer, makeWaSocket } from ".";

export let wsConnection: WASocket;

export class Launcher {
  // @ts-ignore
  constructor() {}
  public async buildProps() {
      const props = await initializer();
      const socket = makeWaSocket(props.state);
      const connection = eventListener(socket, props, this);
      wsConnection = connection
  }
}