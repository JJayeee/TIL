/* 
    arrayHelperMethods
    함수의 인자로 함수가 들어가서
    array의 각각의 값을 순회하거나 조건을 거쳐 push하거나 하는 등 기능 
    (forEach는 return X)
*/


/* forEach */
// ES5
var colors = ['red', 'blue', 'green'];

for (var i=0; i < colors.length; i++) {
    console.log(colors[i]);
}

// ES6+
// forEach(callbackfn)

function logger(x) {
    console.log(x);
}
colors.forEach(logger);

colors.forEach(x => console.log(x));


/* map */
// ESS
const numbers = [1, 2, 3];
const doubleNumbers = [];

for (let i=0; i < numbers.length; i++) {
    doubleNumbers.push(numbers[i]);
}
console.log(doubleNumbers);

// ES6+
// numbers.forEach(x => doubleNumbers.push(x));
// console.log(doubleNumbers);

const tripleNumbers = numbers.map((number) => {
    return number * 3;
})
console.log(tripleNumbers);


/* filter */
// ES5
const products = [
    {name: 'apple', type: 'fruit'},
    {name: 'carrot', type: 'vegetable'},
    {name: 'tomato', type: 'fruit'},
    {name: 'cucumber', type: 'vegetable'},
];

const fruits = [];
for (const product of products) {
    if (product.type === 'fruit') {
        fruits.push(product);
    }
}
console.log(fruits);


// ES6+
// product는 그냥 지칭하고자 하는 이름
const vegetables = products.filter((product) => {
    return product.type === 'vegetable'
})
console.log(vegetables)
