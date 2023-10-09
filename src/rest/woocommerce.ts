import express, { Express, Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import databaseHandler from "../databaseHandler"
const router = express.Router()
const prisma = new PrismaClient()

router.post("/new_order", async (request: Request, response: Response) => {
    try {
        const data = request.body
        data.date_created = data.date_created.date
        data.date_modified = data.date_modified.date

        const order = await databaseHandler.order.new(data)
        console.log({ order, data, meta: data.meta_data })
    } catch (error) {
        console.log(error)
    }
})

export default router
