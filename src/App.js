import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Todolist from './TodoList'
import Navigation from './Navigation'
import EditForm from './EditForm'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_TODOS = 'todoapp.todos'

// TODO sorting: alpha, date due, date created, date completed
// TODO a way to delete tasks
// TODO do not list completed tasks by default
// TODO allow listing of completed tasks by choice

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
		due: '',
		tags: []
	})
	const newTodoRef = useRef()
	const [projects, setProjects] = useState([])
	const [contexts, setContexts] = useState([])
	const [filter, setFilter] = useState({
		tag: 'all',
		which:''
	})

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
	},[todos])

	function filterTodos(e) {
		const item = e.target.textContent
		const category = e.target.parentNode.firstChild.textContent
		const newFilter = {...filter}
		if(item === category) {
			if(item === 'All') {
				newFilter.tag = item.toLowerCase()
			} else {
				newFilter.tag = item.split(' ')[1].toLowerCase()
			}
			newFilter.which = 'all'
		} else {
			newFilter.tag = category.toLowerCase()
			newFilter.which = item
		}
		setFilter(newFilter)
	}
	
	function toggleCompleted(id) {
		let tasks = [...todos]
		const task = tasks.find( task => task.id === id )
		task.completed = !task.completed
		setTodos(tasks)
	}
	
	function handleAddTodo(e) {
		if(e.keyCode === 13 || e.target.id === 'addTodoButton') {
			const newTodoText = newTodoRef.current.value
			// const newTodo = (parseTodo(newTodoText))
			if( newTodoText === '') return
			// TODO validate todo.txt format
			// TODO more than one context possible
			// TODO more than one project possible
			setTodos(prevTodos => {
				return [...prevTodos, parseTodo(newTodoText)]
			})
			newTodoRef.current.value = null
			newTodoRef.current.focus()
		}
	}

// x (A) 2020-06-13 2020-06-12 Task description +project @context due:2020-06-13 tag:custom

	function parseTodo(todoTxt) {
		let newTodoTxt = todoTxt.trim()
		const newTodo = {
			priority: '',
			completed: false,
			description: '',
			id: uuidv4(),
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
		newTodoTxt = newTodoTxt.replace(/due:\d{4}-\d{1,2}-\d{1,2}/i, match => {
			newTodo.due = match.split(':')[1];
			return '';
		});
		// get all custom tags
		const regex = /\w+:\d{4}-\d{1,2}-\d{1,2}|\w+:\w+/i;
		let resultArr = [];
		newTodo.tags = []
		while( (resultArr = regex.exec(newTodoTxt)) != null ) {
			let key, value;
			[key, value] = resultArr[0].split(':');
			newTodo.tags.push({
				'id' : uuidv4(),
				'key' : key,
				'value' : value,
			})
			// newTodo.tags.push({ 'key' : key, 'value' : value })
			newTodoTxt = newTodoTxt.replace(resultArr[0],'');
		}
		console.log('tags:', newTodo.tags)
		newTodo.description = newTodoTxt.trim()
		return newTodo
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
		// TODO auto focus description field
		setTodoToEdit(JSON.parse(JSON.stringify(todo)))
		setEditFormVisible(true)
	}

	function handleCustomTagChange(e) {
		const tagId = e.target.id.split('_')[2]
		const newTags = JSON.parse(JSON.stringify(todoToEdit)).tags
		const index = newTags.findIndex( elem => elem.id === tagId )
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
	/* end EditForm */

	return (
		<div className="App">
			<Navigation filterTodos={filterTodos} projects={projects} contexts={contexts} />
			<div id="todo-list">
				<input ref={newTodoRef} onKeyDown={handleAddTodo} type="text" size="150"/>
				<button onClick={handleAddTodo} id="addTodoButton">Add Todo</button>
				<Todolist filter={filter} todos={todos} toggleCompleted={toggleCompleted} editTodo={editTodo} changePriority={changePriority} />
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
			/> }
		</div>
	);
}

export default App;

