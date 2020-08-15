import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function CustomTags({todo, modalVisible, setModalVisible, handleChange, hilitedCustomTag, setHilitedTag}) {

	const [customTagToEdit, setCustomTagToEdit] = useState({})

	function updateTagToEdit(e) {
		const tagPart = e.target.id.slice('customTag'.length).toLowerCase()
		setCustomTagToEdit({
			...customTagToEdit,
			[tagPart]:[e.target.value]
		})
	}

	function updateCustomTags() {
		setModalVisible(false)
		console.log({customTagToEdit})
		console.log({hilitedCustomTag})
		if(customTagToEdit.key === '' || customTagToEdit.value === '') return
		if(hilitedCustomTag === -1) {
			todo.tags.push(customTagToEdit)
		} else {
			todo.tags[hilitedCustomTag].key = customTagToEdit.key
			todo.tags[hilitedCustomTag].value = customTagToEdit.value
		}
	}
	
	function addCustomTag() {
		setHilitedTag(-1)
		setCustomTagToEdit(
			{
				id: uuidv4(),
				key: '',
				value: ''
			}
		)
		setModalVisible(true)
	}

	function deleteCustomTag(e) {
		console.log({hilitedCustomTag})
		todo.tags.splice(hilitedCustomTag,1)
		console.log({customTagToEdit})
		setCustomTagToEdit({})
		setHilitedTag(-1)
	}

	function cancelEditCustomTagBtn() {
		setCustomTagToEdit({})
		setModalVisible(false)
		setHilitedTag(-1)
	}

	function handleCustomTagClick(e) {
		setHilitedTag(e.target.id)
		if(hilitedCustomTag >= 0) {
			if(e.target.id === hilitedCustomTag) {
				setCustomTagToEdit(todo.tags[e.target.id])
				setModalVisible(true)
			} else {
				document.getElementById(hilitedCustomTag).classList.remove('hilited')
			}
		}
		e.target.classList.add('hilited')
	}
	
	return (
					<>
					{ modalVisible &&
						<div id="custom-tag-dialog">
							<label>Key: </label>
							<input type="text" id="customTagKey" name="customTagKey" value={customTagToEdit.key} onChange={updateTagToEdit} />
							<label>Value: </label><input type="text" id="customTagValue" name="customTagValue" value={customTagToEdit.value} onChange={updateTagToEdit} /><br />
							<button id="updateCustomTagBtn" title="updateCustomTagBtn" type="button" onClick={updateCustomTags}>&#x2713;</button>
							<button id="cancelEditCustomTagBtn" title="cancelEditCustomTagBtn" type="button" onClick={cancelEditCustomTagBtn}>&#x27F2;</button>
						</div>
					}
					{ ( !modalVisible && todo.tags.length > 0) &&
						<>
						<ul id="editCustomTags" onClick={handleCustomTagClick}>
							{ todo.tags.map( (tag, indx) => {
								return (
									<li id={indx} className={ indx === hilitedCustomTag ? 'hilited' : '' } key={`${indx}${todo.id}` } >{tag.key}:{tag.value}</li>
								)
							})}
						</ul>
						{ (hilitedCustomTag >= 0) && <button id="deleteCustomTagBtn" title="deleteCustomTagBtn" type="button" onClick={deleteCustomTag}>&#x232B;</button> }
						</>
					}
					{ <button id="addCustomTagBtn" type="button" onClick={addCustomTag}>+</button> }
					</>
	)
}

// TODO-done click on custom tag - highlight tag and show buttons: delete and edit
// TODO click on edit button or double click tag - show edit dialog
// TODO-done edit dialog: key and value, cancel button, OK button, delete button
//  key={`tag${indx}`}
// key={getRandomInt(8)}
