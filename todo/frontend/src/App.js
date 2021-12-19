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
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";

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
     createProject(name, link, users){
        const headers = this.get_headers()
        const data = {name: name, link: link, users: users}
        axios.post(`http://127.0.0.1:8000/api/project/`,data,{headers}).then(
            response => {


                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects:[]})
        })


     }



    deleteProject(id){

        const headers = this.get_headers()
        console.log(headers)
        console.log(id)
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`,{headers}).then(
            response => {

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects:[]})
        })


    }

     createTodo(text, date,is_active, project, create_user){
        const headers = this.get_headers()
        const data = {text:text, date:date, is_active:is_active, project:project, create_user:create_user}
        axios.post(`http://127.0.0.1:8000/api/todo/`,data,{headers}).then(
            response => {

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos:[]})
        })


     }



    deleteTodo(id){

        const headers = this.get_headers()
        console.log(headers)
        console.log(id)
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`,{headers}).then(
            response => {

                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos:[]})
        })


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
                const users = response.data
                this.setState(
                    {
                        'users':users
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project/', {headers}).then(
            response =>{
                const projects = response.data
                this.setState(
                    {
                        'projects':projects
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(
            response =>{
                const todos = response.data
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

                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                              deleteProject={(id) => this.deleteProject(id)}/>}/>


                        <Route exact path='/projects/create' component={() =>
                             <ProjectForm users={this.state.users} createProject={(name, link, users) => this.createProject(name, link, users)}/>}/>


                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}
                                                                              deleteTodo={(id) => this.deleteTodo(id)}/>}/>


                        <Route exact path='/todo/create' component={() =>
                             <TodoForm create_user={this.state.create_user} project ={this.state.project}createTodo=
                                 {(text, date, is_active, project, create_user) =>
                                 this.createTodo(text, date,is_active, project, create_user)}/>}/>

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
