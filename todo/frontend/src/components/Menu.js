import React from 'react';
import {Link} from "react-router-dom";




const Menu = () => {
    return(

        <div className="container">
            <header className="d-flex justify-content-center py-3">
                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to='/' className="nav-link" aria-current="page">Users</Link></li>
                    <li className="nav-item"><Link to='/projects' className="nav-link">Projects</Link></li>
                    <li className="nav-item"><Link to='/todo' className="nav-link">Todo</Link></li>
                    {/*<li className="nav-item"><a href="#" className="nav-link">Free Link</a></li>*/}
                    {/*<li className="nav-item"><a href="#" className="nav-link">Free Link</a></li>*/}
                </ul>
            </header>
        </div>

    )
};

export default  Menu;