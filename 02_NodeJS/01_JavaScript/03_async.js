/* 
    async function을 활용, 프로미스 앞에 await를 붙여준다.
    해당 프로미스가 resolve 될 때 까지 기다린 뒤 다음 로직으로 넘어간다. 
    에러를 처리하기 위해 try/catch문으로 로직을 감싼다. 
*/

async function findAndSaveUser1(Users) {
  try {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    // 생략
  } catch (error) {
    console.log(error);
  }
}


// arror function + async
const findAndSaveUser2 = async (Users) => {
  try {
  } catch (error) {
  }
};


// for + async/await 을 통해 Promis.all 대체하기
const promise1 = Promise.resolve('success1');
const promise2 = Promise.resolve('success2');
(async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }
})();
