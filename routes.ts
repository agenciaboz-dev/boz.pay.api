import express, { Express, Request, Response } from "express"
import woocommerce from "./src/rest/woocommerce"
import pagseguro from "./src/rest/pagseguro"

export const router = express.Router()

router.use("/woocommerce", woocommerce)
router.use("/pagseguro", pagseguro)
