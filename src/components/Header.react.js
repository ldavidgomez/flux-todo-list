/**
 * Created by David on 22/08/2016.
 */
var React = require('react');

var TodoInput = require('./TodoInput.react');
var TodoActions = require('../actions/TodoActions');

var Header = React.createClass({
    render: function () {
        return (
            <header>
                <h1>TODO-LIST</h1>
                <TodoInput
                    id="new-todo"
                    placeholder="Qué hacer hoy día?"
                    onSave={this._onSave}
                />
            </header>)
    },
    _onSave: function (text) {
        if (text.trim()) {
            TodoActions.create(text);
        }
    }
});

module.exports = Header;