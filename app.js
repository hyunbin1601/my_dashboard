// (1) 서버 설정 app.js

// (2) 경로 설정 routes/todo.js

// (3) 모델 설정 models/todo.js

// (4) 서비스 설정 controllers/todo.js

// (5) 프론트 페이지 설정 views/todo.ejs, public/
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();  //5000을 포트번호로?
const router = require("./routes/index");   //index를 모듈처럼 가져와 사용 가능
app.use(router);  //app(서버)가 사용 가능하게함

app.set("view engine", "ejs"); //express 서버에서 jsp처럼 쓰는 ejs파일을 뷰 엔진으로 설정
app.set("views", path.join(__dirname, 'views'));  //views 디렉토리 생성

app.use("/public", express.static(__dirname + '/public'));   //정적 파일 경로 설정

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//mongo db 연결
// Connect to DB
/*
    connect error 발생 시
    mongodb://[아이디]:[비밀번호]@localhost:27017/[db이름]?authSource=[아이디] 로 변경
    ex) mongodb://admin:1234@localhost:27017/node?authSource=admin
*/
mongoose.connect("mongodb://localhost:27017/node", {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.error("mongoDB Connection Error!", err);
    }
    console.log("mongoDB Connected!");
}
);

app.listen(5000, function() {
    console.log("시동 중");
})

