import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler"

const get = async (id: number, socket: Socket) => {
    const order = await databaseHandler.order.find(id)
    socket.emit("order", order)
}

export default { get }
