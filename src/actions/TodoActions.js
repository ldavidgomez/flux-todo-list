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

TodoActions.delete = function (id) {
    AppDispatcher.dispatch({
        actionType: TodoConstants.TODO_DESTROY,
        id: id
    })
}

TodoActions.deleteAll = function () {
    AppDispatcher.dispatch({
        actionType: TodoActions.TODO_DESTROY_COMPLETED
    })
}

module.exports = TodoActions;