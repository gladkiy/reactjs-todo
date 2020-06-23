'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var e = React.createElement;

var ToDoApp = function (_React$Component) {
    _inherits(ToDoApp, _React$Component);

    function ToDoApp() {
        _classCallCheck(this, ToDoApp);

        return _possibleConstructorReturn(this, (ToDoApp.__proto__ || Object.getPrototypeOf(ToDoApp)).apply(this, arguments));
    }

    _createClass(ToDoApp, [{
        key: 'render',
        value: function render() {
            return React.createElement(TodoList, null);
        }
    }]);

    return ToDoApp;
}(React.Component);

var TodoList = function (_React$Component2) {
    _inherits(TodoList, _React$Component2);

    function TodoList(props) {
        _classCallCheck(this, TodoList);

        var _this2 = _possibleConstructorReturn(this, (TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call(this, props));

        _this2.state = { todos: [{ id: 1, text: '', done: false }], newTodoText: '', nextTodoId: 1 };
        return _this2;
    }

    _createClass(TodoList, [{
        key: 'add',
        value: function add(id, e) {
            if (e.target.value !== '') {
                var todos = this.state.todos;
                var todo = todos.find(function (x) {
                    return x.id === id;
                });
                var todoIndex = todos.findIndex(function (x) {
                    return x.id === id;
                });
                todo.text = e.target.value;
                todos[todoIndex] = todo;
                var emptyTodos = todos.filter(function (x) {
                    return x.text === '';
                });
                if (emptyTodos.length === 0) {
                    todos.push({ id: ++this.state.nextTodoId, text: this.state.newTodoText, done: false });
                }
                this.setState({ todos: todos });
            }
        }
    }, {
        key: 'setStatus',
        value: function setStatus(id, e) {
            var todos = this.state.todos;
            var todo = todos.find(function (x) {
                return x.id === id;
            });
            var todoIndex = todos.findIndex(function (x) {
                return x.id === id;
            });
            todo.done = e.target.checked;
            todos[todoIndex] = todo;
            this.setState({ todos: todos });
        }
    }, {
        key: 'remove',
        value: function remove(start) {
            var todos = this.state.todos;
            todos.splice(start, 1);
            this.setState({ todos: todos });
        }
    }, {
        key: 'move',
        value: function move(index, direction) {
            var todos = this.state.todos;
            if (direction === 'up') {
                if (index === 0) {
                    return;
                }
                index--;
            }

            if (direction === 'down') {
                if (index === todos.length - 1) {
                    return;
                }
            }

            var todo = todos[index];
            todos.splice(index + 2, 0, todo);
            todos.splice(index, 1);
            this.setState({ todos: todos });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'form',
                null,
                React.createElement(
                    'ol',
                    { className: 'pl-0' },
                    this.state.todos.map(function (item, index) {
                        return React.createElement(
                            'li',
                            { key: item.id },
                            React.createElement(
                                'div',
                                { className: 'form-row align-items-center' },
                                React.createElement(
                                    'div',
                                    { className: 'col-auto' },
                                    React.createElement('input', { type: 'text',
                                        className: 'form-control border-top-0 border-left-0 border-right-0 rounded-0 ' + (item.done && item.text !== '' ? 'line-through' : ''),
                                        placeholder: 'Add Task...',
                                        onChange: function onChange(e) {
                                            return _this3.add(item.id, e);
                                        },
                                        disabled: item.done,
                                        value: item.text })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-auto' },
                                    React.createElement(
                                        'div',
                                        { className: 'custom-control custom-checkbox was-validated' },
                                        React.createElement('input', { type: 'checkbox',
                                            className: 'custom-control-input',
                                            id: 'customControlAutosizing' + item.id,
                                            onChange: function onChange(e) {
                                                return _this3.setStatus(item.id, e);
                                            },
                                            checked: item.done }),
                                        React.createElement('label', { className: 'custom-control-label',
                                            htmlFor: 'customControlAutosizing' + item.id })
                                    )
                                ),
                                item.text !== '' ? React.createElement(
                                    'div',
                                    { className: 'col-auto' },
                                    React.createElement(
                                        'div',
                                        { className: 'd-inline-block mr-2' },
                                        React.createElement('i', { onClick: function onClick() {
                                                return _this3.move(index, 'up');
                                            }, className: 'fas fa-arrow-alt-circle-up' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'd-inline-block mr-2' },
                                        React.createElement('i', { onClick: function onClick() {
                                                return _this3.move(index, 'down');
                                            }, className: 'fas fa-arrow-alt-circle-down' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'd-inline-block' },
                                        React.createElement('i', { onClick: function onClick() {
                                                return _this3.remove(index);
                                            }, className: 'fas fa-times-circle' })
                                    )
                                ) : null
                            )
                        );
                    })
                )
            );
        }
    }]);

    return TodoList;
}(React.Component);

ReactDOM.render(React.createElement(ToDoApp, null), document.getElementById('app'));