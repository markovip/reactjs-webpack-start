import React from "react";

export default class Editable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editing: false
    };
  }

  render() {
    const {value, onEdit, onValueClick, editing, ...props} = this.props;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }

  renderEdit = () => {
    return <input type="text"
      autoFocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter} />;
  }

  renderValue = () => {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.props.onValueClick}>
        <span className="value">{this.props.value}</span>
        {onDelete ? this.renderDelete() : null }
      </div>
    );
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    if (this.props.onEdit) {
      this.props.onEdit(e.target.value);
    }

    this.setState({
      editing : false
    });
  }

  renderDelete = () => {
    return <button className="delete" onClick={this.props.onDelete}>x</button>;
  }
}
