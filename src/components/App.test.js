import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({adapter: new Adapter()})


describe('App component', () => {
    let app = mount(<App/>);

    it('should render app title', () => {
        expect(app.find('h2').text()).toEqual('Note to self');
    });
    it('should render clear button', () => {
        expect(app.find('.btn').at(1).text()).toEqual('Clear Notes');
    });

    describe('when rendering the form', () => {
        it('creates a form component', () => {
            expect(app.find('Form').exists()).toBe(true);
        });
        it('renders FormControll component', () => {
            expect(app.find('FormControl').exists()).toBe(true);
        });
        it('renders a submit button', () => {
            expect(app.find('.btn').at(0).text()).toEqual('Submit');
        });
    });
    describe('when creating a note', () => {
        let testNote = 'test note';

        beforeEach(() => {
            app.find('FormControl').simulate('change', {
                target: {value: testNote}
            })
        });
        it('updates the text in state', () => {
            expect(app.state().text).toEqual(testNote);
        });
        describe('and submitting the new note', () => {
            beforeEach(() => {
                app.find('.btn').at(0).simulate('click');
            });
            afterEach(() => {
                app.find('.btn').at(1).simulate('click');
            });
            it('adds the new to state', () => {
                expect(app.state().notes[0].text).toEqual(testNote);
            });
            describe('and remounting the component', () => {
                let app2;
                beforeEach(() => {
                    app2 = app.mount(<App/>);
                });
                it('should read the stored cookies', () => {
                    expect(app2.state().notes).toEqual([{text: testNote}]);
                });
            });
            describe('and clicking the clear button', () => {
                beforeEach(() => {
                    app.find('.btn').at(1).simulate('click');
                });
                it('clears the notes in state', () => {
                    expect(app.state().notes).toEqual([]);
                });
            });
        });
    });
});