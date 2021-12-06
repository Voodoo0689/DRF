import { useParams } from 'react-router-dom'
import React from 'react';

const ProjectItem = ({project}) => {
    return(
        <tr>
            <td>{project.name}</td>
            <td>{project.link}</td>
            <td>{project.users}</td>
        </tr>
    )
};


const Users_in_project=({projects}) => {

    let {id} = useParams();
    let filtered_items = projects.filter((project) => project.users.includes(parseInt(id)))

    return(

        <table>
            <th>Name</th>
            <th>Link</th>
            <th>Users</th>
            {filtered_items.map((project) => < ProjectItem project={project} />)}
        </table>

    )
};


export default Users_in_project;
