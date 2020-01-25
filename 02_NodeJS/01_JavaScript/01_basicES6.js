// 템플릿 문자열
const num1 = 1;
const num2 = 2;
const result1 = 3;
const string1 = `${num1} 더하기 ${num2}는 '${result1}'`;

console.log(string1);


// 객체 리터럴
var sayNode = function() {
    console.log('Node');
};
var es = 'ES'
var oldObject = {
    sayJS: function() {
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es + 6] = 'Fantastic';

oldObject.sayNode();
oldObject.sayJS();
console.log(oldObject.ES6);


const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic',
};

newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);


// 화살표 함수
function add1(x, y) {
    return x + y;
}

const add2 = (x, y) => {
    return x + y;
}

const add3 = (x, y) => x + y;

const add4 = (x, y) => (x + y);

function not1(x) {
    return !x;
}

const not2 = x => !x;


const relationship = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        });
    },
};

relationship.logFriends();


// 비구조화 할당
const candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    }
};
const { getCandy, status: { count } } = candyMachine;

console.log(getCandy);
console.log(candyMachine.status);
console.log(count);
console.log(candyMachine);

