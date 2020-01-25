/* 
    KEY - VALUE 를 나타내는 형식 중 json
    JavaScript Object Notation : JS 의 Object 처럼 표기하는 방법
*/

// JSON 으로 표현 된(전달 된) 데이터의 타입은 무조건 string이다.
const rawJson = `
    {
        "name": "Jay", 
        "job": "None"
    }
`;
// 컴퓨터는 이를 key-value로 읽는 것이 아니라, string 덩어리로 본다.
// 해석하기 위해 다음의 과정이 있어야 한다.

// parsing: 구문 분석
const parseData = JSON.parse(rawJson);
// parseData >> {name: "Jay", job: "None"}

// serializing: 직렬화, 공용어로 번역
const backToJSON = JSON.stringify(parseData);
// bactToJSON >> "{"name":"Jay","job":"None"}"
