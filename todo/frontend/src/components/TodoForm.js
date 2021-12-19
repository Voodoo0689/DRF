import React from "react";

class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            date: '2021-12-31T17:48:00Z',
            is_active: true,
            project: null,
            create_user: null
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }


    handleProjectChange(event) {
        if (!event.target.selectedOptions) {

            this.setState({
                'project': []
            })
            return;
        }
        let project = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            project.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'project': project
        })
    }



    handleSubmit(event) {
        this.props.createProject(this.state.text, this.state.date, this.state.is_active, this.state.project, this.state.create_user)

        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="text">name</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="login">create_user</label>
                    <input type="int" className="form-control" name="create_user" value={this.state.create_user}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="project">user</label>

                    {/*<select className="form-control" name="author"*/}
                    {/*        onChange={(event) => this.handleAuthorChange(event)}>*/}
                    {/*    {this.props.authors.map((item) =>*/}
                    {/*        <option value={item.id}>*/}
                    {/*            {item.first_name}*/}
                    {/*        </option>)}*/}


                    {/*</select>*/}

                    <select name="project" multiple onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.project.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>




                </div>


                <input type="submit" value="Save"/>
            </form>
        );
    }


}

export default TodoForm;