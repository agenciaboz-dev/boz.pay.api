import { Socket } from "socket.io"
import { Client, ClientBag } from "../definitions/client"
import { Customer, Role, Service, User } from "@prisma/client"
import { Server as SocketIoServer } from "socket.io"
import { Server as HttpServer } from "http"
import { Server as HttpsServer } from "https"

export let clientList: Client[] = []
let io: SocketIoServer | null = null

export let coffeeList: User[] = []

export const cleanCoffeeList = (user?: User) => {
    if (user) {
        coffeeList = coffeeList.filter((item) => item.id != user.id)
    } else {
        coffeeList = []
    }
}

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 })
}

export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

const get = (socket: Socket) => clientList.find((client) => client.socket == socket)
const find = (id: number) => clientList.find((client) => client.user.id == id)
const getUser = (client: Client) => client.user
const list = () => clientList.map((client) => client.user)

const remove = (client: Client | undefined) => {
    if (!client) return
    clientList = clientList.filter((item) => item.socket != client.socket)
}

const add = (client: Client) => {
    const exists = find(client.user.id)
    if (exists) remove(client)

    clientList.push(client)
}

const update = (client: Client, user: User & { status: number }) =>
    (clientList = [...clientList.filter((item) => item.socket != client.socket), { ...client, user }])

const clients: ClientBag = {
    get,
    find,
    getUser,
    list,
    add,
    remove,
    update,
}

export const handleSocket = (socket: Socket) => {
    const io = getIoInstance()

    console.log(`new connection: ${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`)
        const client = clients.get(socket)

        if (client) {
            if (client.user) coffeeList = coffeeList.filter((user) => user.id != client.user.id)
        }
    })
}
