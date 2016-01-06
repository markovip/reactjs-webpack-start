import AltContainer from 'alt-container';
import React from "react";
import Notes from "./Notes.jsx";

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

export default class App extends React.Component {

  /*constructor(props) {
    super(props);
    this.state = NoteStore.getState();
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    // Without a property initializer `this` wouldn't
    // point at the right context (defaults to `undefined` in strict mode).
    this.setState(state);
  }*/

  render() {

    return (
      <div>
        <button className="add-lane" onClick={this.addItem}>Add Lane</button>
          <AltContainer
            stores={[LaneStore]}
            inject={{
              lanes: () => LaneStore.getState().lanes || []
            }}
          >
            <Lanes />
          </AltContainer>
      </div>
    );
  }

  addItem = () => {
    LaneActions.create({name: "New Lane"});
  }

  addNote = () => {
    NoteActions.create({task: "New Task"});
  }

  editNote = (id, task) => {
    NoteActions.update({id,task});
  }

  deleteNote = (id) => {
    NoteActions.delete(id);
  }

}
