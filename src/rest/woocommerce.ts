import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import databaseHandler from "../databaseHandler"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/new_order", async (request: Request, response: Response) => {
    try {
        const data = request.body

        const order = await databaseHandler.order.new(data, data.shipping, data.billing)
        console.log({ order })
    } catch (error) {
        console.log(error)
    }
})

export default router
