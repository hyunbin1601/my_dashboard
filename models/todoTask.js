//DB 스키마 영역
//간단하게 묘사하자면 mongoDB에 todo 리스트를 저장할때 담겨질 상자를 만드는 과정을 코드로 구현함
const mongoose = require("mongoose"); //mongoose 모듈을 불러옴
const todoTaskSchema = new mongoose.Schema({  //schema 객체 생성
    content: {       //투두 작성시 필요한 것 : 내용, 적은 시간
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('TodoTask', todoTaskSchema);  //mongoose의 모델로 TodoTask 사용가능
