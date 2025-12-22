const { Router } = express();
const productsRouter = Router();

const productsController = require("../controllers/productsController"); 

productsRouter.get('/', productsController.getAllProducts); 

productsRouter.get('/new', productsController.createProductGet); 
productsRouter.post('/new', productsController.createProductPost);

module.exports = productsRouter;
