const TodoTask = require("../models/todoTask");

//KST Setting, 한국 시간을 디폴트로
var moment = require(`moment-timezone`);  //todolist 작성 시 date를 현재 시간으로 세팅해주기 위해 필요한 moment-timezone 모듈
moment.tz.setDefault("Asia/Seoul");  //한국 시간으로 설정

//Main
exports.get = function(req, res) {
    console.log("todo get");
    TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => {   //TodoTask의 모든 데이터를 찾아 tasks에 저장, db 스키마 이름을 TodoTask로 설정함
        res.render("todo", {todoTasks: tasks});
    })
}
// ** find 메소드 사용법 **
// //Description
// [Model].find(filter, [options], [callback]);

// //Example
// TodoTask.find({}, {sort: {date: -1}}, function(err, tasks){
//     res.render("todo", {todoTasks: tasks});
// });
// {}는 필터링 없이 모든 데이터를 가져오고, 옵션으로 {sort: {date:-1}} 정렬을 하되(sort) date기준으로 내림차순 정렬하겠다는 의미
// callback => function(err, tasks) {} tasks로 받아와 res.render로 todo페이지로 보여라
// mongodb는 sql 쿼리 없이 db를 불러올 수 있어서 편함!

exports.write = async function(req, res) {
    try {
        const todoTask = new TodoTask({
            content: req.body.content,
            date: moment().format('YYYY-MM-DD HH:mm:ss') //현재 시간
        });
        await todoTask.save(); //save()를 통해 db에 저장, 비동기식으로 속도를 높임(프로미스 값을 받음)
        console.table([{id: todoTask._id, content: todoTask.content, date: todoTask.date}]);
        res.redirect("/todo"); //저장 후 todo 페이지 이동
    }
    catch(err) {
        console.error(err);
        res.redirect("/todo");
    }
}
exports.edit = function(req, res){
    const id = req.params.id; //파라미터로 받은 id를 id에 저장
    //router.get("/edit/:id", controller.edit); 에서 보면, :id에서 id는 파라미터에 들어간 변수값으로, req.params를 통해 변수를 추출할 수 있다
    TodoTask.find({}, null, {sort: {date: -1}}, (err, tasks) => { //db에서 조회해서
        res.render("todo-edit", { todoTasks: tasks, idTask: id }); //todo-edit.ejs에 id와 함께 보낸다
    });
};

exports.update = function(req, res){
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => { //해당 id값의 content를 변경
        if(err){
            console.log("==== Fail!! Update TodoTask ====");
            console.error(err);
        }
        console.log("==== Success!! Update TodoTask ====");
        console.log("id: " + id + "\nchanged content: " + req.body.content);
        res.redirect("/todo");
    });
}

exports.remove = function(req, res){
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => { //해당 id의 데이터를 삭제
        if(err){
            console.log("==== Fail!! Remove TodoTask ====")
            console.error(err);
        }
        console.log("==== Success!! Remove TodoTask ====");
        console.log("id: " + id);
        res.redirect("/todo");
    });  
};