import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import parseTodo from './parser.js'
import Todolist from './TodoList'
import Navigation from './Navigation'
import EditForm from './EditForm'
// import { v4 as uuidv4 } from 'uuid';

const LOCAL_TODOS = 'todoapp.todos'

/*
validate file format before parsing
store file info for later varification before download
	*
*/


function App() {

	const [todos, setTodos] = useState([])
	const [editFormVisible, setEditFormVisible] = useState(false)
	const [todoToEdit, setTodoToEdit] = useState({
		description: '',
		priority: '',
		completed: false,
		project: [],
		context: [],
		created: new Date(),
		due: '',
		tags: []
	})
	const newTodoRef = useRef()
	const [projects, setProjects] = useState([])
	const [contexts, setContexts] = useState([])
	const [filter, setFilter] = useState({
		tag: 'all',
		value:'all'
	})
	const [showCompleted, setShowCompleted] = useState(false)

	useEffect( () => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_TODOS))
		if(storedTodos) {
			setTodos(storedTodos)
		}
	},[])

	useEffect( () => {
		localStorage.setItem(LOCAL_TODOS, JSON.stringify(todos))
	}, [todos])

	useEffect( () => {
		const tasks = [...todos]
		const projectList = tasks.reduce( (acc, cur) => {
			if(cur.project && ! cur.project.some( project => acc.includes(project)) ) {
				cur.project.forEach( project => {
					acc.push(project)
				})
				return acc
			} else {
				return acc
			}
		}, [] )
		setProjects(projectList)
		const contextList = tasks.reduce( (acc, cur) => {
			if(cur.context && ! cur.context.some( context => acc.includes(context)) ) {
				cur.context.forEach( context => {
					acc.push(context)
				})
				return acc
			} else {
				return acc
			}
		}, [] )
		setContexts(contextList)
	},[todos])

	function filterTodos(e) {
		// console.log(e.target.textContent)
		// console.log(e.target.parentNode.firstChild.textContent)
		const item = e.target.textContent
		const category = e.target.parentNode.firstChild.textContent
		const newFilter = {...filter}
		if(item === category) {
			if(item === 'All') {
				newFilter.tag = item.toLowerCase()
			} else {
				newFilter.tag = item.toLowerCase() // WTF?? FIXME
			}
			newFilter.value = 'all'
		} else {
			newFilter.tag = category.toLowerCase()
			newFilter.value = item
		}
		setFilter(newFilter)
		hideEditForm()
	}
	
	function toggleCompleted(id) {
		let tasks = [...todos]
		const task = tasks.find( task => task.id === id )
		task.completed = !task.completed
		setTodos(tasks)
	}
	
	function handleAddTodo(e) {
		// TODO why is this not fired onSubmit?
		if(e.keyCode === 13 || e.target.id === 'addTodoButton') {
			const newTodoText = newTodoRef.current.value
			// const newTodo = (parseTodo(newTodoText))
			if( newTodoText === '') return
			setTodos(prevTodos => {
				return [...prevTodos, parseTodo(newTodoText)]
			})
			newTodoRef.current.value = null
			newTodoRef.current.focus()
		}
	}

	function parseTodoTxt(text) {
		const newTodos = [...text.split('\n')].filter( newTodo => newTodo !== '' ).map( newTodo => parseTodo(newTodo) )
		setTodos(prevTodos => {
			return [...prevTodos, ...newTodos]
		})
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

	function toggleShowCompleted() {
		setShowCompleted(!showCompleted)
	}
	
	/* logic for EditForm */

	function editTodo(todo) {
		// TODO auto focus description field
		setTodoToEdit(JSON.parse(JSON.stringify(todo)))
		setEditFormVisible(true)
	}

	function handleCustomTagChange(e) {
		const newTags = JSON.parse(JSON.stringify(todoToEdit)).tags
		const index = newTags.findIndex( elem => elem.id === e.target.id.split('_')[1] )
		newTags[index][e.target.name] = e.target.value
		setTodoToEdit({
			...todoToEdit,
			tags: newTags
		})
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
		// setEditFormVisible(false)
	}

	function hideEditForm() {
		setEditFormVisible(false)
	}

	function deleteTodo() {
		let tasks = [...todos]
		const deleteIndex = tasks.findIndex( todo => todo.id === todoToEdit.id )
		tasks.splice(deleteIndex, 1)
		setTodos(tasks)
	}

	/* end EditForm */

	return (
		<div className="App">
		<div id="wrapper">
			<Navigation filterTodos={filterTodos} filter={filter} projects={projects} contexts={contexts} parseTodoTxt={parseTodoTxt}/>
			<div id="todo-list">
				<div><input id='add-todo' ref={newTodoRef} onKeyDown={handleAddTodo} type="text" size="150" placeholder="Add a new todo..." /></div>
				<Todolist toggleShowCompleted={toggleShowCompleted} showCompleted={showCompleted} filter={filter} todos={todos} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} />
			</div>
		{ editFormVisible &&
			<EditForm
				todoToEdit={todoToEdit}
				projects={projects}
				contexts={contexts}
				handleChange={handleChange}
				handleCustomTagChange = {handleCustomTagChange}
				formatDate={formatDate}
				handleUpdateTodo={handleUpdateTodo}
				hideEditForm={hideEditForm}
				deleteTodo={deleteTodo}
			/> }
		</div>
		</div>
	);
}

export default App;
