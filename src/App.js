import React, { useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, deleteTodoAction, showAllAction, showCompletedAction, showNoCompletedAction, toggleTodoAction } from './store/todoReducer';

function App() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos.todos)

  const showCompleted = useSelector(state => state.todos.showCompleted)
  const showNoCompleted = useSelector(state => state.todos.showNoCompleted)

  const filteredTodos = todos.filter(todo => {
    if (showCompleted) {
      return todo.completed
    } 
    if (showNoCompleted) {
      return !todo.completed
    }
    return true;
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const addTodo = (text) => {
    const newTodo = {
      id: new Date().toISOString(),
      text,
      completed: false,
    }
    if (!text) {
      alert('Do you have plans for today???')
    } else {
      dispatch(addTodoAction(newTodo))
      setText('')
    }
  }

  const deleteTodo = (todo) => {
    dispatch(deleteTodoAction(todo.id))
  }

  const toggleTodo = (todoId) => {
    dispatch(toggleTodoAction(todoId))
  }

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(showAllAction())} className='btnConditional'>
          All todo
        </button>
        <button onClick={() => dispatch(showCompletedAction())} className='btnConditional'>
          Completed
        </button>
        <button onClick={() => dispatch(showNoCompletedAction())} className='btnConditional'>
          No completed
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className='input-form'
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Write your todo action...'
        />
        <button className='btn-add' onClick={() => addTodo(text)}>
          Add todo
        </button>
      </form>
      <div className='todoListBlock'>
      {filteredTodos.map(todo => (
        <div key={todo.id} className='todoItem'>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <p style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</p>
          <button
            className='btnDelete'
            onClick={() => deleteTodo(todo)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;
