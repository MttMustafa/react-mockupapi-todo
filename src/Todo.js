import React, {useRef} from "react";

export default function Todo({todo, updateTodo, deleteTodo}) {
    const currentVal = useRef()
    function toggleCheckbox() {
        todo.isCompleted = !todo.isCompleted
        updateTodo(todo.id, todo.content, todo.isCompleted)
    }

    function updateContent(event) {
        if(event.key === 'Enter') {
            if(currentVal.current.innerText !== todo.content) {
                updateTodo(todo.id, currentVal.current.innerText, todo.isCompleted)
            }
        }
    }

    function deleteEvent() {
        deleteTodo(todo.id)
    }
    return (
    <div>
        <button onClick={deleteEvent}>✖</button>
        <input type='checkbox' checked={todo.isCompleted} onChange={toggleCheckbox}/>
        <span ref={currentVal} contentEditable="true" onKeyPress={updateContent}>{todo.content}</span>
    </div>
    )
}
