/**
 * Created by David on 22/08/2016.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');

var TodoActions = {};

TodoActions.create = function (text) {
    AppDispatcher.dispatch({
        actionType: TodoConstants.TODO_CREATE,
        text: text
    });
};
TodoActions.toggleComplete = function (todo) {
    var id = todo.id;
    var actionType = todo.complete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
        actionType: actionType,
        id: id
    });
};

module.exports = TodoActions;