declare interface PagseguroAuth {
    type: "THREEDS"
    id: string
}

declare interface PagseguroSession {
    session: string
    expires_at: number
}
