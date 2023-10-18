declare type PaymentMethod = "card" | "pix" | "boleto"

declare interface CardOrderForm extends OrderForm {
    encrypted: string
    expiry: string
    cvv: string
    cardOwner: string
    type: "credit" | "debit"
    installments: number

    auth?: string
}

declare interface OrderForm {
    name: string
    cpf: string
    phone: string
    email: string

    postcode: string
    address: string
    district: string
    city: string
    state: string
    complement: string
    number: string
}
