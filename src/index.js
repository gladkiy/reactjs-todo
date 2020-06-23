'use strict';

const e = React.createElement;

class ToDoApp extends React.Component {
    render() {
        return (
            <TodoList />
        );
    }
}

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [{ id: 1, text: '', done: false }], newTodoText: '', nextTodoId: 1 };
    }

    add(id, e) {
        if (e.target.value !== '') {
            let todos = this.state.todos;
            let todo = todos.find(x => x.id === id);
            let todoIndex = todos.findIndex(x => x.id === id);
            todo.text = e.target.value;
            todos[todoIndex] = todo;
            let emptyTodos = todos.filter(x => x.text === '');
            if (emptyTodos.length === 0) {
                todos.push({ id: ++this.state.nextTodoId, text: this.state.newTodoText, done: false });
            }
            this.setState({todos});
        }
    }

    setStatus(id, e) {
        let todos = this.state.todos;
        let todo = todos.find(x => x.id === id);
        let todoIndex = todos.findIndex(x => x.id === id);
        todo.done = e.target.checked;
        todos[todoIndex] = todo;
        this.setState({todos});
    }

    remove(start) {
        let todos = this.state.todos;
        todos.splice(start, 1);
        this.setState({todos});
    }

    move(index, direction) {
        let todos = this.state.todos;
        if (direction === 'up') {
            if (index === 0) {
                return;
            }
            index--;
        }

        if (direction === 'down') {
            if(index === todos.length - 1) {
                return;
            }
        }

        let todo = todos[index];
        todos.splice(index + 2, 0, todo);
        todos.splice(index, 1);
        this.setState({todos});
    }

    render() {
        return (
        <form>
        <ol className="pl-0">
            {this.state.todos.map((item, index) => (
            <li key={item.id}>
                <div className="form-row align-items-center">
                    <div className="col-auto">
                        <input type="text" 
                            className={`form-control border-top-0 border-left-0 border-right-0 rounded-0 ${item.done && item.text !== '' ? 'line-through' : ''}`}
                            placeholder="Add Task..."
                            onChange={(e) => this.add(item.id, e)}
                            disabled={item.done}
                            value={item.text} />
                    </div>
                    <div className="col-auto">
                        <div className="custom-control custom-checkbox was-validated">
                            <input type="checkbox"
                                className="custom-control-input"
                                id={'customControlAutosizing' + item.id}
                                onChange={(e) => this.setStatus(item.id, e)}
                                checked={item.done} />
                            <label className="custom-control-label"
                                htmlFor={'customControlAutosizing' + item.id}></label>
                        </div>
                    </div>
                    {item.text !== '' ? (
                        <div className="col-auto">
                            <div className="d-inline-block mr-2">
                                <i onClick={() => this.move(index, 'up')} className="fas fa-arrow-alt-circle-up"></i>
                            </div>
                            <div className="d-inline-block mr-2">
                                <i onClick={() => this.move(index, 'down')} className="fas fa-arrow-alt-circle-down"></i>
                            </div>
                            <div className="d-inline-block">
                                <i onClick={() => this.remove(index)} className="fas fa-times-circle"></i>
                            </div>
                        </div>
                        ) : (
                            null
                        )
                    }
                </div>
            </li>
            ))}
        </ol>
        </form>
        );
    }
}

ReactDOM.render(
    <ToDoApp />,
    document.getElementById('app')
);