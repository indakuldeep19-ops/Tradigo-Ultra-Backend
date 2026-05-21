import { io } from "socket.io-client";

export const socket = io("https://stream.binance.com:9443");
