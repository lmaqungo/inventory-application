 const { Router } = require("express");
const productsRouter = Router();

const productsController = require("../controllers/productsController"); 

productsRouter.get('/', productsController.getAllProducts); 

productsRouter.get('/new', productsController.createProductGet); 

productsRouter.post('/new', productsController.createProductPost);

productsRouter.get('/:productId', productsController.getProduct);

productsRouter.get('/:productId/edit', productsController.updateProductGet); 
productsRouter.post('/:productId/edit', productsController.updateProductPost); 

productsRouter.post('/:productId/delete', productsController.deleteProductPost);

module.exports = productsRouter;
