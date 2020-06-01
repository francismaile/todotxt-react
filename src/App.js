import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Todolist from './TodoList'
import Navigation from './Navigation'
import EditTodo from './EditTodo'

const LOCAL_TODOS = 'todoapp.todos'

// keep track of project names
// keep track of context names

function App() {
	const [todos, setTodos] = useState([])
	const [todoToEdit, getTodo] = useState({})
	const todoDescrRef = useRef()
	const [projects, setProjects] = useState([])
	const [contexts, setContexts] = useState([])

	useEffect( () => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS))
		if(storedTodos) {
			setTodos(storedTodos)
		}
	},[])

	useEffect( () => {
		localStorage.setItem(LOCAL_TODOS, JSON.stringify(todos))
	}, [todos])

	function toggleCompleted(id) {
		// TODO refactor this to take a whole todo instead of id then lookup
		let tasks = [...todos]
		const task = tasks.find( task => task.id === id )
		task.completed = !task.completed
		setTodos(tasks)
	}

	function handleAddTodo(e) {
		const description = todoDescrRef.current.value
		if( description === '') return
		// parse input in todo.txtformat
		setTodos(prevTodos => {
			return [...prevTodos, 
				{
					priority: 'A',
					completed: false,
					description: description,
					id: todos.length,
					project: 'test3',
					context: 'home',
				}
			]
		})
		todoDescrRef.current.value = null
	}

	function editTodo(todo) {
		getTodo(todo)
		const projectList = todos.reduce( (acc, cur) => {
			if(cur.project && ! acc.includes(cur.project)) {
				acc.push(cur.project)
				return acc
			} else {
				return acc
			}
		}, [] )
		setProjects(projectList)
		const contextList = todos.reduce( (acc, curr) => {
			if(curr.context && !acc.includes(curr.context) ) {
				acc.push(curr.context)
				return acc
			} else {
				return acc
			}
		}, [] )
		setContexts(contextList)
	}

	function NewTodo({todoDescrRef, handleAddTodo}) {
		return(
			<form>
				<input ref={todoDescrRef} type="text" size="150"/>
				<button onClick={handleAddTodo} >Add Todo</button>
			</form>
		)
	}
	

	return (
		<div className="App">
			<Navigation tempContent={"Navigation"}/>
			<div id="todo-list">
				<NewTodo todoDescrRef={todoDescrRef} handleAddTodo={handleAddTodo} />
				<Todolist todos={todos} toggleCompleted={toggleCompleted} editTodo={editTodo} />
			</div>
			<EditTodo todo={todoToEdit} projects={projects} contexts={contexts} />
		</div>
	);
}

export default App;

