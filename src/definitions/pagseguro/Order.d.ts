interface Customer {
    name?: string
    email?: string
    tax_id: string
    phone?: Phone[]
}

interface Phone {
    country: 55
    area: number
    number: number
    type: "CELLPHONE"
}

interface Item {
    name: string
    quantity: number
    unit_amount: number
}

interface Address {
    street: string
    number: string
    complement: string
    locality: string
    city: string
    region_code: string
    region?: string
    country: "BRA" | "Brasil"
    postal_code: string
}

interface Shipping {
    address: Address
}

interface QrCode {
    amount: { value: number }
}

interface Charge {
    reference_id: string
    description?: string
    amount: {
        value: number
        currency: "BRL"
    }
    payment_method: {
        type: "CREDIT_CARD" | "DEBIT_CARD" | "BOLETO"
        installments?: number
        capture: true
        card?: {
            encrypted: string
            security_code: string
            holder: {
                name: string
            }
            store: false
        }

        boleto?: {
            due_date: string
            instruction_lines: {
                line_1: string
                line_2: string
            }
            holder: {
                name: string
                tax_id: string
                email: string
                address: Address
            }
        }

        authentication_method?: PagseguroAuth
    }
}

declare interface PagseguroOrder {
    reference_id?: string
    customer: Customer
    items?: Item[]
    shipping?: Shipping
    deep_links?: { amount: string; amount_value: string }
    qr_codes?: QrCode[]
    charges?: Charge[]
    notification_urls: string[]
}
