import { Billing, Order, PrismaClient, Shipping } from "@prisma/client"

const prisma = new PrismaClient()

const inclusions = {
    order: { billing: true, shipping: true },
}

const order = {
    new: async (data: Order, _shipping: Shipping, _billing: Billing) => {
        const shipping = await prisma.shipping.create({ data: _shipping })
        const billing = await prisma.billing.create({ data: _billing })
        const order = await prisma.order.create({ data: { ...data, shipping_id: shipping.id, billing_id: billing.id }, include: inclusions.order })

        return order
    },
}

export default { order }
