var express = require("express");
var router = express.Router();
var db = require("../database_setup/prepare_db");

router.get("/api/chickens", db.getAllChickens);
router.get("/api/chickens/:id", db.getSingleChicken);
router.post("/api/chickens", db.createChicken);
router.put("/api/chickens/:id", db.updateChicken);
router.delete("/api/chickens/:id", db.deleteChiken);

module.exports = router;