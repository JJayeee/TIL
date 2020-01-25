function a(x, y) {
    console.log('a');
    console.log(x+y);
    return x + y;
}

function b(n) {
    console.log('b');
    // console.log(n++);
    // const a = n ++ 
    return n ++; // return 하고 나서 n += 1
    // return ++n; // n += 1 하고 return 
}

// const a = n ++ ; return a; => 119
// const a = n ++ ; return n; => 120
// const a = n ++ ; return n ++; => 120
// console.log(n++); return n++; => 99, 120

function c(f1, f2) {
    console.log('c');
    // console.log(f2(99));
    return f1(10, 10) + f2(99);
} 


console.log(
    c(a, b)
)

// 엥 119 였는데 왜 120 됐지
