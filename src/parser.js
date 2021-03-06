import { v4 as uuidv4 } from 'uuid';

// x (A) 2020-06-13 2020-06-12 Task description +project @context due:2020-06-13 tag:custom

export default function parseTodo(todoTxt) {
		let newTodoTxt = todoTxt.trim()

		const newTodo = {
			id: uuidv4(),
			description: '',
			priority: '',
			completed: false,
			project: [],
			context: [],
			created: new Date(),
			tags: []
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
		// creation and/or completion date
		newTodoTxt = newTodoTxt.replace(/^\d{4}-\d{1,2}-\d{1,2}\s+/, match => {
			newTodo.createdDate = match.trim();
			return '';
		});
		newTodoTxt = newTodoTxt.replace(/^\d{4}-\d{1,2}-\d{1,2}\s+/, match => {
			newTodo.completeDate = newTodo.createdDate;
			newTodo.createdDate = match.trim();
			return '';
		});
		// get todo item's project connection
		newTodoTxt = newTodoTxt.replace(/\s\+\w+/gi, match => {
			console.log(match)
			newTodo.project.push(match.slice(1).substring(1))
			newTodo.project.sort()
			return '';
		});
		// get todo item's context connection
		newTodoTxt = newTodoTxt.replace(/\s@\w+/gi, match => {
			newTodo.context.push(match.slice(1).substring(1))
			newTodo.context.sort()
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

