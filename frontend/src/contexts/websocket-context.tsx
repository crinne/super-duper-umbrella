import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io('http://localhost:4000');
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;
export const useWebsocket = () => useContext(WebsocketContext);
