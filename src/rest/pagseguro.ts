import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { getIoInstance } from "../io/socket"
import { writeFileSync } from "fs"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/", async (request: Request, response: Response) => {
    try {
        const data = request.body

        console.log({ order: data })
    } catch (error) {
        console.log(error)
    }
})

router.post("/webhook", async (request, response, next) => {
    const data = request.body

    console.log("WEBHOOK CALL")
    if (data.charges?.length > 0) {
        const io = getIoInstance()

        const charge = data.charges[0]
        console.log(charge)

        writeFileSync("logs/webhook.txt", JSON.stringify(data, null, 4))

        await prisma.order.update({ data: { pag_status: charge.status }, where: { id: Number(data.reference_id) } })
        io.emit("pagseguro:paid", { id: Number(data.reference_id), charge })
    }

    response.json({ message: "teste" })
})

export default router