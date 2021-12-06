import logo from './logo.svg';
import './App.css';
import React from 'react'
import axios from "axios";

import {render} from "@testing-library/react";
import UserList from "./components/Users";
import ProjectList from "./components/Project";
import TodoList from "./components/Todo";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import Not_found404 from "./components/Not_found404";
import Users_in_project from "./components/Users_in_project";
import LoginForm from "./components/LoginForm";
import Cookies from "universal-cookie";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users':[],
            'projects':[],
            'todos':[],
            'token':'',

        }
    }


    set_token(token){
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_auth(){
        return !!this.state.token
    }

    logout(){
        this.set_token('')
    }


    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }


    get_token(username, password) {

        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password}).then(
            response => {
                this.set_token(response.data['token'])
                console.log(response.data)

            }).catch(error => alert('Invalid username or password'))
    }

    load_data(){
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(
            response =>{
                const users = response.data.results
                this.setState(
                    {
                        'users':users
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project/', {headers}).then(
            response =>{
                const projects = response.data.results
                this.setState(
                    {
                        'projects':projects
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(
            response =>{
                const todos = response.data.results
                this.setState(
                    {
                        'todos':todos
                    }
                )
            }
        ).catch(error => console.log(error))
    }



    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }




    componentDidMount() {
        this.get_token_from_storage()
    }



    render()
    {

        return (
            <div>
                <BrowserRouter>
                        <ul>
                            <li>
                                {this.is_auth() ? <button onClick={()=>this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    <Menu/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>} />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>} />
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>} />
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>} />
                        <Route path='/user/:id'>
                            <Users_in_project projects={this.state.projects} />
                        </Route>
                        <Redirect from='/users' to='/' />
                        <Route component={Not_found404} />
                    </Switch>
                    <Footer/>

                </BrowserRouter>

            </div>



        );
    };
}

export default App;
