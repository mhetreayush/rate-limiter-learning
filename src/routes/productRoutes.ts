import { Router } from "express";
import { getProductsList } from "@controllers/productControllers";

const router = Router();

router.get("/getProducts", getProductsList);

export { router as productsRouter };
