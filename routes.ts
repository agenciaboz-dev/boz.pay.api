import express, { Express, Request, Response } from "express"
import pagseguro from "./src/rest/pagseguro"

export const router = express.Router()

router.use("/pagseguro", pagseguro)
