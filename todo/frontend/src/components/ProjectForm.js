import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            link:'https://github.com/',
            users: [],
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

        handleLinkChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }


    handleUserChange(event) {
        if (!event.target.selectedOptions) {

            this.setState({
                'user': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'user': users
        })
    }


    handleSubmit(event) {
        this.props.createProject(this.state.name,this.state.link, this.state.user)

        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="login">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="login">link</label>
                    <input type="text" className="form-control" name="link" value={this.state.link}
                           onChange={(event) => this.handleLinkChange(event)}/>
                </div>



                <div className="form-group">
                    <label htmlFor="user">user</label>

                    {/*<select className="form-control" name="author"*/}
                    {/*        onChange={(event) => this.handleAuthorChange(event)}>*/}
                    {/*    {this.props.authors.map((item) =>*/}
                    {/*        <option value={item.id}>*/}
                    {/*            {item.first_name}*/}
                    {/*        </option>)}*/}


                    {/*</select>*/}

                    <select name="user" multiple onChange={(event) => this.handleUserChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>




                </div>


                <input type="submit" value="Save"/>
            </form>
        );
    }


}

export default ProjectForm;