import express, { Express, Request, Response } from "express"
import woocommerce from "./src/rest/woocommerce"

export const router = express.Router()

router.use("/woocommerce", woocommerce)
