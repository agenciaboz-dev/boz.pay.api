import axios from "axios"

const api = axios.create({ baseURL: "https://api.correios.com.br" })

const headers = {
    "Content-Type": "application/json",
}

let token: CorreiosToken

const getToken = async () => {
    try {
        const expiry = new Date(token?.expiraEm)

        // if (new Date() > expiry) {
        const response = await api.post(
            "/token/v1/autentica/cartaopostagem",
            { numero: "0077967704" },
            { auth: { username: "37996009000104", password: "zNyfXA6u00LNuPyDKbPJQn4tgJDr11yVOlHdQhrM" }, headers }
        )
        token = response.data
        console.log(token)
        // }
    } catch (error) {
        console.log(error)
    }
}

export default { getToken }
