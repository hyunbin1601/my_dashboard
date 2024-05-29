const express = require("express");
const app = express();
const router = express.Router();

const TodoRouter = require('./todo');   //routes의 todo.js를 가져와 사용 가능하게함
//Refactoring
router.use('/todo', TodoRouter)  // /todo경로로 접근하면 TodoRouter를 사용가능하게함, ex> todo/write, todo/remove, ....
//index.js /todo 를 걸쳐 todo.js /write 로 간다
module.exports = router;  //app.js에서 이걸 사용 가능하게함