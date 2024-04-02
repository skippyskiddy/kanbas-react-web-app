import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;


function WorkingWithArrays() {
    const API = `${API_BASE}/api/courses/a5/todos`;

    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const [errorMessage, setErrorMessage] = useState(null);


    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };

    const deleteTodo = async (todo: any) => {
        try {
            const response = await axios.delete(`${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };

    const updateTodo = async () => {
        try {
            const response = await axios.put(`${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }

    };


    const removeTodo = async (todo: any) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };


    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };



    return (
        <div>
            <h3>Working with Arrays</h3>
            <div className="d-flex flex-column w-25 ">
                <input className="form-control mb-2" type="number" value={todo.id}
                    onChange={(e) => setTodo({
                        ...todo, id: parseInt(e.target.value)
                    })} />
                <input className="form-control mb-2" type="text" value={todo.title}
                    onChange={(e) => setTodo({
                        ...todo, title: e.target.value
                    })} />

                <textarea className="form-control mb-2" value={todo.description}
                    onChange={(e) => setTodo({
                        ...todo,
                        description: e.target.value
                    })} />
                <input className="form-control mb-2" value={todo.due} type="date"
                    onChange={(e) => setTodo({
                        ...todo, due: e.target.value
                    })} />
                <label>
                    <input checked={todo.completed} type="checkbox"
                        onChange={(e) => setTodo({
                            ...todo, completed: e.target.checked
                        })} />
                    Completed
                </label>
                <button className="btn btn-primary" onClick={postTodo}> Post Todo </button>
            </div>

            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`} >
                <button className="btn btn-primary"> Update Title to {todo.title}</button>
            </a>

            <h4>Retrieving Arrays</h4>
            <a href={API}>
                <button className="btn btn-primary">Get Todos</button>
            </a>

            <h4>Retrieving an Item from an Array by ID</h4>
            <input className="form-control-sm me-2" value={todo.id}
                onChange={(e) => setTodo({
                    ...todo,
                    id: parseInt(e.target.value)
                })} />
            <a href={`${API}/${todo.id}`}>
                <button className="btn btn-primary">Get Todos by ID</button>
            </a>

            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`}>
                <button className="btn btn-primary">Get Completed Todos</button>
            </a>

            <h3>Creating new Items in an Array</h3>
            <a href={`${API}/create`}>
                <button className="btn btn-primary">Create Todo</button>
            </a>

            <h3>Deleting from an Array</h3>
            <a href={`${API}/${todo.id}/delete`}>
                <button className="btn btn-primary">Delete Todo with ID = {todo.id}
                </button>
            </a>

            <h3>Edit Todo Completion</h3>
            <input type="checkbox" checked={todo.completed}
                onChange={(e) => setTodo({
                    ...todo, completed: e.target.checked
                })} />
            <a href={`${API}/${todo.id}/completed/${todo.completed}`}>
                <button className="btn btn-primary">Complete Todo with ID = {todo.id}
                </button>
            </a>

            <h3>Edit Todo Description</h3>
            <input className="form-control-sm me-2" type="text" value={todo.description}
                onChange={(e) => setTodo({
                    ...todo, description: e.target.value
                })} />
            <a href={`${API}/${todo.id}/description/${todo.description}`}>
                <button className="btn btn-primary">Describe Todo with ID = {todo.id}
                </button>
            </a>

            <div className="mt-2">
                <button className="btn btn-primary me-2" onClick={createTodo} >
                    Create Todo
                </button>

                <input className="form-control-sm me-2" value={todo.id} onChange={(e) => setTodo({
                    ...todo, id: parseInt(e.target.value)
                })} />
                <input className="form-control-sm me-2" value={todo.title} onChange={(e) => setTodo({
                    ...todo, title: e.target.value
                })} />
                <button className="btn btn-primary" onClick={updateTitle} >
                    Update Title
                </button>


                {errorMessage && (
                    <div className="alert alert-danger mb-2 mt-2">
                        {errorMessage}
                    </div>
                )}

                <ul className="list-group mt-2">
                    {todos.map((todo) => (
                        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center w-50">
                            <div className="me-auto">
                                <div className="fw-bold">{todo.title}</div>
                                <div>{todo.description}</div>
                                <div>Due: {todo.due}</div>
                            </div>

                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button className="btn btn-warning btn-sm" onClick={() => fetchTodoById(todo.id)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => removeTodo(todo)}>
                                    Remove
                                </button>
                                <button onClick={() => deleteTodo(todo)}
                                    className="btn btn-danger float-end ms-2">
                                    Delete
                                </button>
                                <button onClick={() => updateTodo()}
                                    className="btn btn-warning float-end ms-2">
                                    Update todo
                                </button>
                            </div>

                            <input
                                className="form-check-input mt-0 ms-3"
                                type="checkbox"
                                checked={todo.completed}
                                readOnly
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
export default WorkingWithArrays;