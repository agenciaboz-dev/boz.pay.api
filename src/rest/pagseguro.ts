import express, { Express, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { getIoInstance } from "../io/socket"
import { writeFileSync } from "fs"
import woocommerce from "../api/woocommerce"
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

router.get("/webhook", async (request, response, next) => {
    response.json({ message: "webhook" })
})

router.post("/webhook", async (request, response, next) => {
    const data = request.body

    console.log("WEBHOOK CALL")
    console.log(data)
    if (data.charges?.length > 0) {
        const io = getIoInstance()

        const charge = data.charges[0]
        console.log(charge)

        writeFileSync(`logs/webhook-${data.reference_id}.txt`, JSON.stringify(data, null, 4))

        await prisma.order.update({ data: { pag_status: charge.status }, where: { id: Number(data.reference_id) } })
        io.emit("pagseguro:paid", { id: Number(data.reference_id), charge })

        if (data.charges[0].status == "PAID") {
            woocommerce
                .updateOrderStatus(Number(data.reference_id), "processing")
                .then((data) => {
                    // console.log(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    response.json({ message: "teste" })
})

export default router