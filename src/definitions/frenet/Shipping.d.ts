declare interface FrenetShipping {
    SellerCEP: string
    RecipientCEP: string
    ShipmentInvoiceValue: number
    ShippingServiceCode: null

    ShippingItemArray: FrenetShippingItem[]
    RecipientCountry: "BR"
}

declare interface FrenetShippingItem {
    Height: number
    Length: number
    Quantity: number
    Weight: number
    Width: number

    SKU?: string
    Category?: string
}
