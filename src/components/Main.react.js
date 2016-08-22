/**
 * Created by David on 22/08/2016.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;

var TodoActions = require('../actions/TodoActions');

var classNames = require('classnames');

var Main = React.createClass({
    propTypes: {
        todos: ReactPropTypes.object.isRequired
    },

    render: function () {
        if (Object.keys(this.props.todos).length < 1) {
            return null;
        }
        var todosProp = this.props.todos;
        var todos = [];
        for (var key in todosProp) {
            todos.push(<li
                className={classNames({
                    'completed': todosProp[key].complete,
                    'item' : true
                })}
                onClick={this._onClick.bind(this, todosProp[key])}
                key={todosProp[key].id}>
                <span className="check"></span>
                {todosProp[key].text}
                <span className="delete" onClick={this._delete.bind(this, todosProp[key].id)}> X </span>
            </li>);
        }
        return (
            <section id="main">
                <section>
                    <ul className="todoList" id="todo-list">{todos}</ul>
                </section>
                <section className="footerList">
                    <button className="deleteAll" onClick={this._deleteAll}>Eliminar Todos</button>
                    <div className="clear"></div>
                </section>
            </section>
        )
    },
    _onClick: function (e) {
        TodoActions.toggleComplete(e);
    },
    _delete: function (id, e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        TodoActions.delete(id);
    },
    _deleteAll: function () {
        if (confirm("Eliminar totalmente los TODOS??")) {
            TodoActions.deleteAll();
        }

    }
});

module.exports = Main;