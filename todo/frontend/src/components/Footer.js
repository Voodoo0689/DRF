import React from 'react';
import {Link} from "react-router-dom";




const Footer = () => {
    return(
        <div className="container fixed-bottom">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><Link to='/' className="nav-link px-2 text-muted">Users</Link></li>
                    <li className="nav-item"><Link to='/projects' className="nav-link px-2 text-muted">Projects</Link></li>
                    <li className="nav-item"><Link to='/todo' className="nav-link px-2 text-muted">Todo</Link></li>
                    {/*<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Free Link</a></li>*/}
                    {/*<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Free Link</a></li>*/}
                </ul>
                <p className="text-center text-muted">2021 Company, Inc</p>
            </footer>
        </div>


    )
};

export default  Footer;