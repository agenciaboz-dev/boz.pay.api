import { Order, Shipping } from "@prisma/client"
import axios from "axios"

const api = axios.create({ baseURL: "https://api.frenet.com.br" })

const headers = {
    Accept: "application/json",
    ContentType: "application/json",
    token: "719F0A0DRD801R4160R9024R0449C04F134C",
}

const quote = async (order: Order & { shipping: Shipping }) => {
    const data: FrenetShipping = {
        SellerCEP: "88330488",
        RecipientCEP: order.shipping.postcode,
        RecipientCountry: "BR",
        ShipmentInvoiceValue: Number(order.total),
        ShippingServiceCode: null,
        ShippingItemArray: [{ Height: 2, Length: 33, Quantity: 1, Weight: 1.18, Width: 47 }],
    }

    const response = await api.post("/shipping/quote", data, { headers })
    return response.data
}

export default { quote }
