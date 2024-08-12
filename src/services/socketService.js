import { io } from 'socket.io-client';
import { getAccessToken } from '../helper/index';

const token = await getAccessToken();
// export interface MessageDTO {
//   message: string;
//   groupId: string;
//   senderId: string;
// }

const socket = io(import.meta.env.VITE_SOCKET_API, {
  query: {
    token,
  },
  autoConnect: false,
});

const connect = async () => {
  socket.connect();
};

const disconnect = () => {
  socket?.disconnect();
};

const subscribeToChat = (callback) => {
  const eventHandler = (message) => {
    callback(message);
  };

  socket?.on('chat message', eventHandler);

  return () => {
    socket?.off('chat message', eventHandler);
  };
};

const sendMessage = (message) => {
  socket?.emit('chat message', message);
};

export { connect, disconnect, sendMessage, subscribeToChat };
