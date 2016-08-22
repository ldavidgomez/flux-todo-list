/**
 * Created by David on 22/08/2016.
 */
var React = require('react');
var ReactPropTypes = React.PropTypes;


var ENTER_KEY_CODE = 13;

var TodoInput = React.createClass({
    propTypes: {
        id: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string
    },
    getInitialState: function () {
        return {
            value: this.props.value || ''
        };
    },

    render: function () {
        return (
            <input type="text"
                   className="todoInput"
                   id={this.props.id}
                   placeholder={this.props.placeholder}
                   onBlur={this._save}
                   onChange={this._onChange}
                   onKeyDown={this._onKeyDown}
                   value={this.state.value}
                   autoFocus={true}
            />

        )
    },
    _onChange: function (event) {
        this.setState({
            value: event.target.value
        });
    },
    _onKeyDown: function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {

            this._save();
        }
    },
    _save: function () {
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    }

});

module.exports = TodoInput;