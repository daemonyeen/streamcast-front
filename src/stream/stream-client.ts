import Stomp from "stompjs";
import type { MessageDto, SendMessageDto } from "~/stream/message";

export class StreamClient {
  private _client = Stomp.client("ws://94.131.14.228:8081/ws");

  connect(roomId: string, callback: (message: MessageDto) => void) {
    this._client.connect({}, () => {
      this._client.subscribe(`/stream/messages/${roomId}`, message => {
        callback(JSON.parse(message.body) as MessageDto);
      });
    });
  }

  sendMessage(message: SendMessageDto) {
    if (!this._client.connected) {
      return;
    }

    this._client.send("/app/message", {}, JSON.stringify(message));
  }
}
