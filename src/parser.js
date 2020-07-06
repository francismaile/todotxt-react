import { v4 as uuidv4 } from 'uuid';

// x (A) 2020-06-13 2020-06-12 Task description +project @context due:2020-06-13 tag:custom

export default function parseTodo(todoTxt) {
		let newTodoTxt = todoTxt.trim()

		const newTodo = {
			priority: '',
			completed: false,
			description: '',
			id: uuidv4(),
			project: [],
			context: [],
			created: new Date(),
			due: ''
		}
		newTodoTxt = newTodoTxt.replace(/^x\s+/, function(match) {
			newTodo.completed = !!match; // !! converts result.match to boolean
			return '';
		});
		// determine if marked with a priority. currently limited to one of A, B , or C
		newTodoTxt = newTodoTxt.replace(/\([A-C]\)\s+/, match => {
			newTodo.priority = match[1];
			return '';
		});
		// get todo item's project connection
		newTodoTxt = newTodoTxt.replace(/\+\w+/gi, match => {
			newTodo.project.push(match.slice(1))
			return '';
		});
		// get todo item's context
		newTodoTxt = newTodoTxt.replace(/@\w+/gi, match => {
			newTodo.context.push(match.slice(1))
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
		newTodo.description = newTodoTxt.trim()
		return newTodo
	}

