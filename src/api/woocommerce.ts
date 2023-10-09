import axios from "axios"

const api = axios.create({ baseURL: "https://pabinka.com.br/wp-json/wc/v3" })

const consumer = {
    key: "ck_a578268f50876a11fbebfb4fd5adb5dd6477f1e8",
    secret: "cs_197be5e883e023936135e7a1e184700ac53ec466",
}

const updateOrderStatus = async (orderId: string | number, status: string) => {
    const response = await api.put(
        `/orders/${orderId}`,
        { status },
        {
            headers: {
                "Content-Type": "application/json",
            },
            auth: {
                username: consumer.key,
                password: consumer.secret,
            },
        }
    )

    return response.data
}

export default { updateOrderStatus }
