const express = require("express");
const app = express();  //express로 서버를 열어줌
const router = express.Router(); 

// Controller 를 불러와서 exports 메소드 사용
const controller = require("../controllers/todo");

// Main
router.get('/', controller.get); // http://localhost:5000/todo/

// Write
router.post('/write', controller.write); // http://localhost:5000/todo/write

// Edit
router.get("/edit/:id", controller.edit);

// Update
router.post("/update/:id", controller.update);

// Remove
router.get("/remove/:id", controller.remove);

module.exports = router; //router를 index.js에서 모듈로 사용 가능하게함