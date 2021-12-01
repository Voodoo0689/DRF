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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users':[],
            'projects':[],
            'todos':[]
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response =>{
                const users = response.data
                this.setState(
                    {
                        'users':users
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project/').then(
            response =>{
                const projects = response.data.results
                this.setState(
                    {
                        'projects':projects
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/').then(
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


    render()
    {

        return (
            <div>
                <BrowserRouter>

                        <Menu/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>} />
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>} />
                        <Route exact path='/todo' component={() => <TodoList todos={this.state.todos}/>} />
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
