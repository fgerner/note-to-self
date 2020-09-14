import React, {Component} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";
import Note from "./Note";
import {bake_cookie, read_cookie} from 'sfcookies';

const cookie_key = 'NOTES';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            notes: []
        };
    }

    componentDidMount() {
        this.setState({notes: read_cookie(cookie_key)});
    }

    submit() {
        const {notes, text} = this.state;
        notes.push({ text});
        this.setState({ notes});
        bake_cookie(cookie_key, this.state.notes)
    }

    render() {
        return (
            <div>
                <h2>Note to self</h2>
                <Form inline={true}>
                    <FormControl onChange={event => this.setState({text: event.target.value})}/>
                    {' '}
                    <Button onClick={() => this.submit()}>Submit</Button>
                </Form>
                {
                    this.state.notes.map((note, index) => {
                        return (
                            <Note key={index} note = { note }/>
                        )
                    })
                }
            </div>
        )
    }
}

export default App;