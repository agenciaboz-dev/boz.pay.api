import axios from "axios"
import { Billing, Order, PrismaClient } from "@prisma/client"
import { existsSync, mkdirSync, writeFileSync } from "fs"
import { Socket } from "socket.io"

const prisma = new PrismaClient()

const api = axios.create({
    // baseURL: "https://api.pagseguro.com",
    baseURL: "https://sandbox.api.pagseguro.com",
    timeout: 1000 * 10,
})

const token = "1BD9D2D2181B4660BAFC9426CA5A63A9" // sandbox
// const token = "5e137c4a-acd6-433a-83a7-736815c6995b0ad8f02a47329494fac489b021d5ab384b54-9b9f-4140-b4cf-4675e700a829"

// returns PAID
// Número: 4539620659922097
// Cód. de Seg.: 123
// Data Exp.:12/2026

// returns DECLINED
// Número: 4929291898380766
// Cód. de Seg.: 123
// Data Exp.:12/2026

const headers = { Authorization: token }

const order = (order: { id: number; total: number; method: PaymentMethod } & (OrderForm | CardOrderForm), socket: Socket) => {
    console.log(order)
    const pag_order: PagseguroOrder = {
        reference_id: order.id.toString(),
        customer: {
            name: order.name,
            tax_id: order.cpf.replace(/\D/g, ""),
            email: order.email,
        },
        items: [
            {
                name: "Pabinka",
                quantity: 1,
                unit_amount: order.total * 100,
            },
        ],
        notification_urls: ["https://app.agenciaboz.com.br:4108/api/pagseguro/webhook"],

        qr_codes: order.method == "pix" ? [{ amount: { value: order.total * 100 } }] : undefined,
        charges:
            order.method == "card"
                ? [
                      {
                          reference_id: order.id.toString(),
                          amount: { currency: "BRL", value: order.total * 100 },
                          payment_method: {
                              capture: true,
                              card: {
                                  encrypted: (order as CardOrderForm).encrypted,
                                  holder: {
                                      name: (order as CardOrderForm).cardOwner,
                                  },
                                  security_code: (order as CardOrderForm).cvv,
                                  store: false,
                              },
                              installments: (order as CardOrderForm).installments,
                              type: (order as CardOrderForm).type == "debit" ? "DEBIT_CARD" : "CREDIT_CARD",
                          },
                      },
                  ]
                : undefined,
    }

    console.log(pag_order)

    api.post("/orders", pag_order, { headers })
        .then((response) => {
            console.log(response.data)
            if (order.method == "pix") {
                socket.emit("qrcode", response.data.qr_codes[0])
            }

            if (!existsSync("logs")) {
                mkdirSync("logs")
            }

            writeFileSync("logs/new_order.txt", JSON.stringify({ request: order || "undefined", response: response.data }, null, 4))
        })
        .catch(async (error) => {
            console.log("error")
            console.log(error.response.data)
            socket.emit("order:pay:error", error.response.data.error_messages[0])
            await prisma.order.update({
                where: { id: Number(order.id) },
                data: {
                    pag_status: "error",
                    pag_error: error.response.data.error_messages.map((error: any) => error.description).toString(),
                },
            })
        })
}

const pixPay = (order: any, callback: Function) =>
    api.post("/pix/pay/" + order.id, { status: "PAID", tx_id: order.id }, { headers }).then((response) => {
        callback(response)
    })

const get = (order: any, callback: Function) =>
    api.get("/orders/" + order.id, { headers }).then((response) => {
        callback(response)
    })

const auth3ds = async () => {
    const authHeader = { ...headers, ContentType: "application/json" }
    const response = await axios.post("https://sdk.pagseguro.com/checkout-sdk/sessions", {}, { headers: authHeader })
    console.log(response.data)
}

export default { order, pixPay, get, auth3ds }
