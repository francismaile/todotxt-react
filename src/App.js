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

	const blankTodo = {
		id: 0,
		description: '',
		priority: '',
		completed: false,
		project: [],
		context: [],
		created: new Date(),
		due: '',
		tags: []
	}
	const [todos, setTodos] = useState([])
	const [editFormVisible, setEditFormVisible] = useState(false)
	const [todoToEdit, setTodoToEdit] = useState(blankTodo)
	const newTodoRef = useRef()
	const [projects, setProjects] = useState([])
	const [contexts, setContexts] = useState([])
	const [filter, setFilter] = useState({
		tag: 'all',
		value:'all'
	})
	const [showCompleted, setShowCompleted] = useState(false)
	const [hilitedCustomTag, setHilitedTag] = useState(-1)
	const [modalVisible, setModalVisible] = useState(false)

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
		let projects = []
		tasks.forEach( task => {
			projects = [...projects, ...task.project]
		})
		const projectList = projects.reduce( (acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [] ).sort()
		setProjects(projectList)
		let contexts = []
		tasks.forEach( task => {
			contexts = [...contexts, ...task.context]
		})
		const contextList = contexts.reduce( (acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [] ).sort()
		setContexts(contextList)
	},[todos])

	function filterTodos(e) {
		// console.log(e.target.textContent)
		const item = e.target.textContent
		const category = e.target.parentNode.firstChild.textContent
		const newFilter = {...filter}
		// console.log({category}, {item}, {newFilter})
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
		// TODO why is this not fired onSubmit?a because then it would need to be in a fomr element.
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
		setHilitedTag(-1)
		setModalVisible(false)
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
		[...document.getElementsByClassName('todoItem')].forEach( element => element.classList.remove('hilited') )
		setEditFormVisible(false)
	}

	function deleteTodo() {
		[...document.getElementsByClassName('todoItem')].forEach( element => element.classList.remove('hilited') )
		const reallyDoIt = window.confirm('Are you sure. We can\'t undo this.')
		if(reallyDoIt) {
			let tasks = [...todos]
			const deleteIndex = tasks.findIndex( todo => todo.id === todoToEdit.id )
			tasks.splice(deleteIndex, 1)
			setTodos(tasks)
			setTodoToEdit(blankTodo)
		}
	}

	/* end EditForm */

	return (
		<div className="App">
		<div id="wrapper">
			<Navigation filterTodos={filterTodos} filter={filter} projects={projects} contexts={contexts} parseTodoTxt={parseTodoTxt}/>
			<div id="todo-list">
				<div><input id='add-todo' ref={newTodoRef} onKeyDown={handleAddTodo} type="text" size="150" placeholder="Add a new todo..." /></div>
				<Todolist
					toggleShowCompleted={toggleShowCompleted}
					showCompleted={showCompleted}
					filter={filter}
					todos={todos}
					toggleCompleted={toggleCompleted}
					editTodo={editTodo}
					changePriority={changePriority}
				/>
			</div>
		{ editFormVisible &&
			<EditForm
				todo={todoToEdit}
				setTodoToEdit={setTodoToEdit}
				projects={projects}
				contexts={contexts}
				handleCustomTagChange = {handleCustomTagChange}
				handleUpdateTodo={handleUpdateTodo}
				hideEditForm={hideEditForm}
				deleteTodo={deleteTodo}
				hilitedCustomTag={hilitedCustomTag}
				setHilitedTag={setHilitedTag}
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/> }
		</div>
		</div>
	);
}

export default App;
