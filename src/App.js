import './App.css';
import TodoList from './features/TodoList';

function App() {
  return (
    <div>
      <TodoList />
    </div>
  );
}

export default App;


// 리액트쿼리 - 상태관리
// 상태관리란?
// 주어진 시간 내에 시스템(view)에 나타내는거 

// Redux vs SWR vs ReactQuery
// Redux는 비동기 처리가 어려움 -> Thunk, Saga 설치 필요, 코드가 길다
// Redux의 단점 보완을 위해 SWR,ReactQuery가 나타남

// SWR vs ReactQuery
// SWR
// SWR 훨씬가볍다. GC가 없다. mutation Hook이 없다. -> CRUD 할때 고생한다.

// ReactQuery
// API 통신 로직을 직접 다루지 않는다.
// API통신을 위해 axios, fetch then 이런걸 직접 만들어야 한다. 

// Query : CRUD 중 R한다. 데이터를 가져온다.
// Mutaion : CUD 한다. 데이터를 추가 수정 삭제한다.
// invalidation : 만기되는 데이터,,, 직접 보여주실 예정

// ReactQuery에서 주장하는 개념
// Client State - Redux, State -> 동기적으로 저장되는 데이터(Redux Store), 지속되지 않는 데이터
// Server State - 리액트 앱에서 비동기 요청으로 받아올 수 있는 데이터(백엔드 DB에 저장된 데이터)
// 리액트는 SPA - 우리는 서버와 자주 통신 하면 안되요.
// 서버에서 처음 데이터를 받아올때 쿼리를 통해서 받아온 데이터들이 캐시에 저장되는 형태

// 데이터 캐싱 - 고속 data storage를 사용해서 이전에 검색하거나 이미 계산한 데이터를 효율적으로 재사용함

// 5가지 상태 (28:00 영상 확인)
// fresh - 만료되지 않은 쿼리
// fetching - 요청중인 쿼리
// stale - 만료된 쿼리 
// inactive - 사용하지 않는 쿼리
// delete - GC에 의해서 캐시에서 제거된 쿼리

// 캐시는 뭐냐? 우리가 만약에 abc 마트에 직원, 단골손님이 자주 와서 이 신발 보려고 왔는데. 한 번 둘러보고 올께요. 이 사람이 한바퀴 돌고와서 신발 살거암. 그렇기때문에
// 이 신발을 창고에 안넣어두고 밖에 둠. 
// 쿼리를 통해 가져온 데이터들은 처음에는 fresh 
// 요청을 통해 가져오지 않고 그냥 있는거 씀.
// 이 데이터에는 유통기한이 있고, 이 데이터들이 일정 기간 지나서 사용하기 어려운 상태를 stail이라고 함