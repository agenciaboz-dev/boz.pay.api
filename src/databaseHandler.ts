import { Billing, Order, PrismaClient, Shipping } from "@prisma/client"

const prisma = new PrismaClient()

const inclusions = {
    order: { billing: true, shipping: true },
}

const order = {
    find: async (id: number) => await prisma.order.findUnique({ where: { id }, include: inclusions.order }),
    new: async (data: Order & { shipping: Shipping; billing: Billing }) => {
        const shipping = await prisma.shipping.create({ data: data.shipping })
        const billing = await prisma.billing.create({ data: data.billing })
        const order = await prisma.order.create({
            data: {
                id: data.id,
                status: data.status,
                customer_id: data.customer_id,
                cart_hash: data.cart_hash,
                date_created: data.date_created,
                date_modified: data.date_modified,
                order_key: data.order_key,
                total: data.total,
                shipping_id: shipping.id,
                billing_id: billing.id,
            },
            include: inclusions.order,
        })

        return order
    },
}

export default { order }
