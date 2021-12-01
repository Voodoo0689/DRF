import React from 'react';


const TodoItem = ({todo}) => {
    return(
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.date}</td>
            <td>{todo.is_active}</td>
            <td>{todo.project}</td>
            <td>{todo.create_user}</td>

        </tr>
    )
};


const TodoList = ({todos}) => {
    return(

        <table>
            <th>ID</th>
            <th>Text</th>
            <th>Date</th>
            <th>Active</th>
            <th>Project</th>
            <th>Creater</th>
            {todos.map((todo) => < TodoItem todo={todo} />)}
        </table>

    )
};

export default TodoList;