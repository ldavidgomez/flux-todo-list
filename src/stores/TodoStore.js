/**
 * Created by David on 22/08/2016.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _todos = {};


var create = function (text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        completed: false,
        text: text
    };
};

var update = function (id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
};

var delete_todo = function (id) {
    delete _todos[id];
};

var delete_all = function () {
    _todos = {};

};

var TodoStore = assign({}, EventEmitter.prototype, {
    getAll: function () {
        return _todos;
    },
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback)
    }
});



AppDispatcher.register(function (action) {
    var text;

    switch (action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text !== '') {
                create(text);
                TodoStore.emitChange();
            }
            break;
        case TodoConstants.TODO_COMPLETE:
            update(action.id, {complete: true});
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_UNDO_COMPLETE:
            update(action.id, {complete: false});
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_DESTROY:
            delete_todo(action.id);
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_DESTROY_COMPLETED:
            delete_all();
            TodoStore.emitChange();
            break;
        default:

    }
});

module.exports = TodoStore;