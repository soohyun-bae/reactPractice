import { useState } from 'react'
import './App.css'

function App() {
  // 변화할 수 있는 데이터인 todoList 상태 만들기
  // [상태, 상태변경함수]
  const [todoList, setTodoList] = useState([
    { id: 0, content: '밥 먹기' },
    { id: 1, content: '공부하기' } //  객체로 만든 이유 : 리스트 형태로 정보를 표시할 경우 객체로 만드는 것이 좋음
  ])

  return (
    <>
      {/*자식컴포넌트 props이름 = {props} */}
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  )
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map(todo => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList}/>
      ))}
    </ul>
  )
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState('')

  return (
    <li>
      {todo.content}
      <input value={inputValue} onChange={(event) =>
        setInputValue(event.target.value)
      } />
      <button onClick={() => {
        setTodoList((prev) => prev.map((el) => el.id === todo.id ? { ...el, content:inputValue } : el))
        setInputValue('')
      }}>수정</button>
      <button onClick={() => {
        setTodoList((prev) => {
          return prev.filter((el) => el.id !== todo.id)
        })
      }}>삭제</button>
    </li>
  )
}

function TodoInput({ todoList, setTodoList }) {
  // input을 state로 관리하기
  const [inputValue, setInputValue] = useState('')

  return (
    <>
      {/*input에 변경이 일어나면 setInputValue함수를 실행해, input에 값을 event로 받아와*/}
      <input value={inputValue} onChange={(event) =>
        setInputValue(event.target.value)
      } />
      <button onClick={() => {
        {/* 버튼을 누르면 todoList형식에 맞는 객체를 만들어,
          id값은 고유한 것이어야 하니까 이럴 때 사용할 수 있는 방법은
          특정 시간을 기준으로 id를 만들어서 겹치지 않을 id를 생성해줌*/}
        const newTodo = { id: Number(new Date()), content: inputValue }

        const newTodoList = [...todoList, newTodo]
        setTodoList(newTodoList)
        setInputValue('')
      }}>추가하기</button>
    </>
  )
}

export default App
