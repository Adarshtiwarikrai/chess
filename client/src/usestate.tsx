import { useState, useEffect } from "react";

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message,setmessage]=useState('')
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    
    ws.onopen = () => {
      console.log("WebSocket connection established.");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      setSocket(null);
    };
    ws.onmessage=(data)=>{
      // console.log("message from usestate",JSON.parse(data.data))
      console.log("hello",JSON.parse(data.data))
      setmessage(JSON.parse(data.data))
    }
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on unmount
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  },[]);

  // Optional: Helper method to send messages
  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log(message)
      socket.send(message);
    } else {
      console.warn("WebSocket is not open.");
    }
  };

  return {socket,sendMessage,message};
};
