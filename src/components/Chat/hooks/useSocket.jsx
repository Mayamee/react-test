import { useEffect, useState, createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = (url, opts = {}) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io(url, opts);
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [url]);
  return socket;
};

export const SocketProvider = ({ children, opts }) => {
  const { url, ...restOpts } = opts;
  const socket = useSocket(url, restOpts);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);
