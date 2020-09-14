import React, {Component} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            notes: []
        };
    }

    submit() {
        const notes = this.state.notes;
        const newNote = {text: this.state.text};
        notes.push(newNote);
        this.setState({notes: notes});
    }

    render() {
        return (
            <div>
                <h2>Note to self</h2>
                <Form inline>
                    <FormControl onChange={event => this.setState({text: event.target.value})} />
                    {' '}
                    <Button onClick={() => this.submit()}>Submit</Button>
                </Form>
                {
                    this.state.notes.map(note => {
                        return (
                            <div>{note.text}</div>
                        )
                    })
                }
            </div>
        )
    }
}

export default App;