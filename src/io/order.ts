import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler"
import woocommerce from "../api/woocommerce"

const get = async (id: number, socket: Socket) => {
    const order = await databaseHandler.order.find(id)
    socket.emit("order", order)
}

const pay = async (id: number, socket: Socket) => {
    woocommerce
        .updateOrderStatus(id, "processing")
        .then((data) => {
            socket.emit("order:pay:success")
        })
        .catch((error) => {
            socket.emit("order:pay:error", error)
        })
}

export default { get, pay }
