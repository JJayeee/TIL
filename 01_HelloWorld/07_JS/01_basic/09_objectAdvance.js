// ES5
// var => const/let으로 대체되었지만 써보면
var books = ['Learning JS', 'Eloquent JS'];

var comics = {
    dc: ['Joker', 'Batman'],
    marvel: ['Avangers' ,'spiderman'],
};

var megazine = {}

var bookshop = {
    books: books,
    comics: comics,
    megazine: megazine,
}


// ES6+
const books = ['Learning JS', 'Eloquent JS'];

const comics = {
    dc: ['Joker', 'Batman'],
    marvel: ['Avangers' ,'spiderman'],
};

const megazine = {}

const bookshop = {
    books, comics, megazine,  // k-v 이름이 완전히 동일할 때, 다음과 같이 가능하다. 
}

// bookshop.comics.dc
// > (2) ["Joker", "Batman"]
