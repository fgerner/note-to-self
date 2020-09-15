import React from "react";
import Enzyme, {mount} from "enzyme";
import Note from "./Note";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const props = {note: {text: 'test note'}}

describe('Note', () => {
    let note = mount(<Note {...props} />);
    it('should render the note text', () => {
        expect(note.find('p').text()).toEqual(props.note.text);
    })
})