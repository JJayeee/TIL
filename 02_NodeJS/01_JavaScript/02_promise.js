/* 
    프로미스
    new Promise로 프로미스를 생성할 수 있으며, 안에 resolve와 reject를 매개변수로 갖는 
    콜백 함수를 넣어준다. 이렇게 만든 promise 변수에 then과 catch 매서드를 붙일 수 있다.
    프로미스 내부에서 resolve가 호출되면 then이, reject가 호출되면 catch가 실행된다.
    resolve와 reject에 넣어준 인자는 각각 then, catch의 매개변수에서 받을 수 있다.
*/

const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
});

promise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(erorr);
  });


promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message + '+');
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      resolve(message2 + '+');
    });
  })
  .then((message3) => {
    console.log(message3);
  })
  .catch((error) => {
    console.error(error);
  });


// 프로미스 활용: 콜백을 프로미스로 바꾸기 (p.64)
function findAndSaveUser1(Users) {
  Users.findOne({}, (err, user) => { // 첫 번째 콜백
    if (err) {
      return console.error(err);
    }
    user.name = 'zero';
    user.save((err) => { // 두 번째 콜백
      if (err) {
        return console.error(err);
      }
      Users.findOne({ gender: 'm' }, (err, user) => { // 세 번째 콜백
        // 생략
      });
    });
  });
}
// 콜백 함수가 세 번 중첩되어 있다. 콜백 함수가 나올 때 마다 코드의 깊이가 깊어지며
// 각 콜백 함수마다 에러도 따로 처리해줘야 한다. 이를 아래와 같이 바꿀 수 있다. 

function findAndSaveUser2(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = 'zero';
      return user.save();
    })
    .then((user) => {
      return Users.findOne({ gender: 'm' });
    })
    .then((user) => {
      // 생략
    })
    .catch(err => {
      console.error(err);
    });
}


// // 프로미스 여러 개를 한 번에 실행하기
const promise1 = Promise.resolve('성공 1');
const promise2 = Promise.resolve('성공 2');
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
