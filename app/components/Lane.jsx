import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import LaneActions from '../actions/LaneActions';

export default class Lane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  render() {
    const {lane, ...props} = this.props;
    const id = lane.id;

    return (
      <div {...props}>
        <div className="lane-header">
          <Editable className="lane-name" editing={lane.editing}
            value={lane.name} onEdit={this.editName.bind(this, id)}
            onValueClick={this.activateLaneEdit.bind(this, id)} />
          <div className="lane-add-note">
            <button onClick={this.addNote.bind(this, id)}>+</button>
          </div>
        </div>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.get(lane.notes)
          }}
        >
          <Notes onValueClick={this.activateNoteEdit} onEdit={this.editNote} onDelete={this.deleteNote.bind(this, id)} />
        </AltContainer>
      </div>
    );
  }

  editName(id, name) {
    if (name) {
      LaneActions.update({id, name, editing:false});
    } else {
      LaneActions.delete(id);
    }
  }

  activateLaneEdit(id) {
    LaneActions.update({id, editing:true});
  }

  activateNoteEdit(id) {
    NoteActions.update({id, editing:true});
  }

  addNote(laneId) {
    const note = NoteActions.create({value: 'New task'});

    console.log('New Note created: ', note);
    console.log('Now attach it to lane with id: ', laneId);
    LaneActions.attachToLane({
      laneId,
      noteId: note.id
    });
  }

  editNote(id, value) {
    NoteActions.update({id, value, editing : false});
  }

  deleteNote(laneId, noteId) {
    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  }
}
