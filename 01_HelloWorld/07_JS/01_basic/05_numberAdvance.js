//.typeof 는 함수가 아니라 연산자!, 일항연산자.

typeof(1) // number
typeof(Infinity) // number
typeof(NaN) // number

// number 연산이 이상할 경우 에러가 아니라 NaN 이라는 값을 return

Infinity - Infinity // NaN
Infinity - 1 // Infinity

'asdf' + 1 // 덧셈이 아니라 string concat으로 자동 형변환, 'asdf1'
'1' + 1 // "11"
'1' - 2 // -1

'asdf' - 1 // 그 외의 연산은 NaN
'asdf' * 1 // NaN
