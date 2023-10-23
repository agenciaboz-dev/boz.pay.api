import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler"
import woocommerce from "../api/woocommerce"
import pagseguro from "../api/pagseguro"
import frenet from "../api/frenet"

const get = async (id: number, socket: Socket) => {
    const order = await databaseHandler.order.find(Number(id))
    socket.emit("order", order)

    if (order) {
        try {
            const quoteResponse = await frenet.quote(order)
            const quoteList = quoteResponse.ShippingSevicesArray
            // console.log(quoteResponse)
            socket.emit("quote", quoteList)
        } catch (error) {
            console.log(error)
            socket.emit("quote", [])
        }
    }
}

const pay = async (order: { id: number; total: number; method: PaymentMethod } & (OrderForm | CardOrderForm), socket: Socket) => {
    try {
        if (order.method == "card") {
            if ((order as CardOrderForm).type == "debit" && !(order as CardOrderForm).auth) {
                let session = pagseguro.getSession()

                if (!session || new Date() >= new Date(session.expires_at)) {
                    session = await pagseguro.auth3ds()
                }

                socket.emit("pagseguro:3ds", session)
                return
            }
        }

        pagseguro.order(order, socket)
    } catch (error) {
        console.log(error)
        socket.emit("order:pay:error", error)
    }
}

export default { get, pay }
