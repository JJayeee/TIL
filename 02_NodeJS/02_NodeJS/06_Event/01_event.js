const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => { console.log('이벤트 1'); });
myEvent.on('event2', () => { console.log('이벤트 2'); });
myEvent.on('event2', () => { console.log('이벤트 2 추가'); });
// event 이름과 event 발생 시 callback을 연결, 이러한 연결 동작을 eventlistening 이라 한다

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.once('event3', () => { console.log('이벤트 3'); });
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => { console.log('이벤트 4'); });
myEvent.removeAllListeners('event4'); // 연결 된 모든 eventListener를 제거한다
myEvent.emit('event4');

const listener = () => { console.log('이벤트 5'); };
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

const listener2 = () => { console.log('이벤트 6'); };
myEvent.on('event6', listener2);
myEvent.emit('event6');
myEvent.off('event6', listener2);
myEvent.emit('event6');

console.log(myEvent.listenerCount('event2'));