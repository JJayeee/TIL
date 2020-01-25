const images = [
    { height: 10, width: 30 },
    { height: 20, width: 90 },
    { height: 53, width: 32 }
];

const areas = [];

images.forEach(image => {
    m = image.height * image.width;
    areas.push(m)
})

console.log(areas)

const areas2 = images.map(image => image.height * image.width)

console.log(areas2)


const paints = [
    { color: 'red' },
    { color: 'blue' },
    { color: 'yellow' }
];


function pluck (array, property) {
    return array.map(d => d[property] )
}


console.log(pluck(paints, 'color'))

const numbers = [15, 25, 35, 45, 55, 65, 75, 85, 95];

const filteredNumbers = numbers.filter(number => number > 50)

console.log(filteredNumbers)


const numbers2 = [10, 20, 30];

function reject(array, iteratorFunction) {
    return array.filter(item => !iteratorFunction(item))
}

const lessThan15 = reject(numbers2, function(number) {
    return number > 15
})

console.log(lessThan15)


var users = [
    { name: 'abc' },
    { name: 'def' },
    { name: 'ghi' }
];

var user; 

for (var i = 0; i < users.length; i++) {
    if (users[i].name == 'abc') {
        user = users[i];
        // break;
    }
    console.log(i); // 2
}

console.log(user)
console.log(i) // 3 | break 걸면 0!!!

const c = users.find(function(user) { return user.name === 'def' })
console.log(c)


const ladders = [
    { id: 1, height: 20 },
    { id: 3, height: 30}
];

function findWhere(array, criteria) {
    const property = Object.keys(criteria)[0];
    return array.find(elem => {
        return elem[property] === criteria[property];
    })
}

console.log(findWhere(ladders, { height: 20 }));


const computers = [
    { name: 'macbook', ram: 16 },
    { name: 'gram', ram: 8 },
    { name: 'series9', ram: 32 }
];

const everyComputersAvailable = computers.every(function(computer) {
    return computer.ram > 16;
})

const someComputersAvailable = computers.some(computer => computer.ram > 16);

console.log(everyComputersAvailable);
console.log(someComputersAvailable);