import { Socket } from "socket.io"
import { Server as SocketIoServer } from "socket.io"
import { Server as HttpServer } from "http"
import { Server as HttpsServer } from "https"
import order from "./order"

let io: SocketIoServer | null = null

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 })
}

export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

export const handleSocket = (socket: Socket) => {
    const io = getIoInstance()

    console.log(`new connection: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`)
    })

    socket.on("order:get", (id) => order.get(id, socket))
    socket.on("order:pay", (data) => order.pay(data, socket))
}
