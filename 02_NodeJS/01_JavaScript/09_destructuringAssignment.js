// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

const abc = { a: 'aa', bd: function () { console.log('right');}};
const { bd : b } = abc;
b()