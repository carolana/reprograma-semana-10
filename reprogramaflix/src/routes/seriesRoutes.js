const controller = require("../controllers/seriesController")

const express = require("express")
const router = express.Router()

router.get("/", controller.home)
router.get("/todos", controller.getAll)
router.get("/:id", controller.getById)
router.get("/titulo", controller.getByTitle)
router.get("/genero", controller.getByGenre)
router.post("/cadastrar", controller.createSerie)
router.delete("/:id", controller.deleteSerie)
router.put("/:id", controller.replaceSerie)
router.patch("/updateTitle/:id", controller.updateTitle)

module.exports = router