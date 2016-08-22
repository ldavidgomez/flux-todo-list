/**
 * Created by David on 22/08/2016.
 */
var React = require('react');

var TodoStore = require('../stores/TodoStore');

var Header = require('./Header.react');
var Main = require('./Main.react');

var getTodoState = function () {
    return {
        todos: TodoStore.getAll()
    }
};

var MyApp = React.createClass({
    getInitialState: function () {
        return getTodoState()
    },

    componentDidMount: function () {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function () {
        return (
            <div className="app">
                <Header />
                <Main todos={this.state.todos}/>
            </div>
        );
    },

    _onChange: function () {
        this.setState(getTodoState());
    }
});

module.exports = MyApp;