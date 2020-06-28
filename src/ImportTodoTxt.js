import React from 'react'

// TODO offer option to not import completed todos

export default function ImportTodoTxt({parseTodoTxt}) {

	function importFile() {
		// insert file input element
		// https://www.richardkotze.com/top-tips/how-to-open-file-dialogue-just-using-javascript
		const fileSelector = document.createElement('input');
		fileSelector.setAttribute('type', 'file');
		fileSelector.setAttribute('multiple', 'multiple');
		fileSelector.click();


		fileSelector.addEventListener( 'change', function() {
			const fileList = [...this.files];
			fileList.forEach( file => {
				const reader = new FileReader();
				reader.onload = function(e) {
					parseTodoTxt(e.target.result);
				}
				reader.readAsText(file)
			})
		}, false );
	}
	return (
		<button onClick={importFile}>Import</button>
	)
}



