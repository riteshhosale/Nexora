import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children, user }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!user) return;

        const socketInstance = io("http://localhost:5000", {
            withCredentials: true,
        });

        socketInstance.on("connect", () => {
            console.log("Connected to socket server:", socketInstance.id);

            socketInstance.emit("register", user._id);
        });
        
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};