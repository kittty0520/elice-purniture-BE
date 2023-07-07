const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
 /*
  required: 필수 입력
  unique: 다른 행과 중복되면 안됨.
  trim: 공백 제거(문자열 타입에 사용)
  default: 문서가 생성되면 기본값으로 저장된다.
  lowercase: 대문자를 소문자로 저장
  match: 정규시긍로 저장하려는 값과 비교
  validate: 함수로 개발자가 조건을 만듦.
  set: 값을 입력할 때 함수로 조건을 만듦.
  get: 값을 출력할 때 함수로 조건을 만듦.
  ref: 해당하는 모델을 참조할 때 사용.
*/ 
  num: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    maxlength: 15,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
    required: true
  },
  password: {
    type: String,
    minlength: 10
  },
  phone: {
    type: Number,
    minlength: 9,
    maxlength: 11
  }
})