import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler"
import woocommerce from "../api/woocommerce"
import { pagseguro } from "../api/pagseguro"

const get = async (id: number, socket: Socket) => {
    const order = await databaseHandler.order.find(id)
    socket.emit("order", order)
}

const pay = async (order: { id: number; total: number; method: PaymentMethod } & (OrderForm | CardOrderForm), socket: Socket) => {
    try {
        pagseguro.order(order, socket)
    } catch (error) {
        console.log(error)
        socket.emit("order:pay:error", error)
    }
    // woocommerce
    //     .updateOrderStatus(id, "processing")
    //     .then((data) => {
    //         console.log(data)
    //         socket.emit("order:pay:success")
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //         socket.emit("order:pay:error", error)
    //     })
}

export default { get, pay }
