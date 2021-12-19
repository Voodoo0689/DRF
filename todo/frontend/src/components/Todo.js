import React from 'react';
import {Link} from "react-router-dom";


const TodoItem = ({todo, deleteTodo}) => {
    return(
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.date}</td>
            <td>{todo.is_active}</td>
            <td>{todo.project}</td>
            <td>{todo.create_user}</td>
            <td>
                <button onClick={() => deleteTodo(todo.id)} type='button'>
                    Delete
                </button>
            </td>

        </tr>
    )
};


const TodoList = ({todos, deleteTodo}) => {
    return(
        <div>
            <table>
                <th>ID</th>
                <th>Text</th>
                <th>Date</th>
                <th>Active</th>
                <th>Project</th>
                <th>Creater</th>
                {todos.map((todo) => < TodoItem todo={todo} deleteTodo={deleteTodo} />)}
            </table>
            <Link to='/todo/create'>Create</Link>
        </div>
    )
};

export default TodoList;