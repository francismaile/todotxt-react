import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Todolist from './TodoList'
import Navigation from './Navigation'
import EditForm from './EditForm'

const LOCAL_TODOS = 'todoapp.todos'

// keep track of project names
// keep track of context names

function App() {

	const [todos, setTodos] = useState([])
		// TODO due is optional
	const [editFormVisible, setEditFormVisible] = useState(false)
	const [todoToEdit, setTodoToEdit] = useState({
		description: '',
		priority: '',
		completed: false,
		project: '',
		context: '',
		created: new Date(),
		due: ''
	})
	const newTodoRef = useRef()
	const [projects, setProjects] = useState([])
	const [contexts, setContexts] = useState([])

	function buildNavMenu() {
		updateProjectList()
		updateContextList()
	}

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
		let tasks = [...todos]
		const task = tasks.find( task => task.id === id )
		task.completed = !task.completed
		setTodos(tasks)
	}
// x (A) 2020-06-13 2020-06-12 Task description +project @context due:2020-06-13 tag:custom

	function parseTodo(todoTxt) {
		let newTodoTxt = todoTxt.trim()
		const newTodo = {
			priority: '',
			completed: false,
			description: '',
			id: todos.length,
			project: '',
			context: '',
			created: new Date(),
			due: ''
		}
		// determine if marked with a priority. currently limited to one of A, B , or C
		newTodoTxt = newTodoTxt.replace(/\([A-C]\)\s+/, match => {
			newTodo.priority = match[1];
			return '';
		});
		// get todo item's project connection
		newTodoTxt = newTodoTxt.replace(/\+\w+/i, match => {
			newTodo.project = match.slice(1);
			return '';
		});
		// get todo item's context
		newTodoTxt = newTodoTxt.replace(/@\w+/i, match => {
			newTodo.context = match.slice(1);
			return '';
		});
		// get todo item's context
		newTodoTxt = newTodoTxt.replace(/\w+:\d{4}-\d{1,2}-\d{1,2}/i, match => {
			newTodo.due = match.split(':')[1];
			return '';
		});
		newTodo.description = newTodoTxt
		return newTodo
	}

	function handleAddTodo(e) {
		if(e.keyCode === 13 || e.target.id === 'addTodoButton') {
			const newTodoText = newTodoRef.current.value
			// const newTodo = (parseTodo(newTodoText))
			if( newTodoText === '') return
			// TODO validate todo.txt format
			// TODO created and due are optional
			// TODO more than one context possible
			// TODO more than one project possible
			setTodos(prevTodos => {
				return [...prevTodos, parseTodo(newTodoText)]
			})
			newTodoRef.current.value = null
			newTodoRef.current.focus()
		}
	}

	function updateProjectList() {
		const projectList = todos.reduce( (acc, cur) => {
			if(cur.project && ! acc.includes(cur.project)) {
				acc.push(cur.project)
				return acc
			} else {
				return acc
			}
		}, [] )
		setProjects(projectList)
	}

	function updateContextList() {
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

	function changePriority(currentPriority, todoId) {
		if(currentPriority === '') {
			currentPriority = 'A'
		} else if(currentPriority === 'A') {
			currentPriority = 'B'
		} else if(currentPriority === 'B') {
			currentPriority = 'C'
		} else {
			currentPriority = ''
		}
		const tasks = [...todos]
		const editIndex = todos.findIndex( todo => todo.id === todoId )
		tasks[editIndex].priority = currentPriority
		setTodos(tasks)
	}

	/*
	 logic for EditForm
	*/

	function editTodo(todo) {
		// auto focus description field
		setTodoToEdit(todo)
		updateProjectList()
		updateContextList()
		setEditFormVisible(true)
	}

	function handleChange(e) {
		setTodoToEdit({
			...todoToEdit,
			[e.target.name]: e.target.value
		})
	}
	
	function formatDate(theDate) {
		if(!theDate) return ''
		theDate = typeof theDate === "string" ? new Date(theDate) : theDate
		return theDate.toISOString().split('T')[0]
	}

	function handleUpdateTodo(e) {
		// TODO validation: project and context names must be camelCase or single word
		// TODO tab updates and moves to next field, enter updates and hides form
		
		e.preventDefault()
		const tasks = [...todos]
		const editIndex = todos.findIndex( todo => todo.id === todoToEdit.id )
		tasks[editIndex] = todoToEdit
		setTodos(tasks)
		setEditFormVisible(false)
	}

	/* end EditForm */

	return (
		<div className="App">
			<Navigation projects={projects} contexts={contexts} tempContent={"Navigation"}/>
			<div id="todo-list">
				<input ref={newTodoRef} onKeyDown={handleAddTodo} type="text" size="150"/>
				<button onClick={handleAddTodo} id="addTodoButton">Add Todo</button>
				<Todolist todos={todos} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} />
			</div>
		{ editFormVisible &&
			<EditForm
				todoToEdit={todoToEdit}
				projects={projects}
				contexts={contexts}
				handleChange={handleChange}
				formatDate={formatDate}
				handleUpdateTodo={handleUpdateTodo}
			/> }
		</div>
	);
}

export default App;

