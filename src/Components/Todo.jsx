import React from "react";

let temp;
const Todo = () => {
    const [inputValue, setInputValue] = React.useState("");
    const [todos, setTodos] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    const [page, setPage] = React.useState(1);

    React.useEffect( () => {
        getTodos();
    }, [page]);

    const getTodos = () => {
        setIsLoading(true);
        fetch (`http://localhost:3004/todos?_page=${page}&_limit=3`)
            .then((res) => res.json())
            .then((res) => {
                temp = res.length;
                console.log(res.length)
                setTodos(res);
                setIsError(false);
            })
            .catch((res) => setIsError(true))
            .finally(() => setIsLoading(false))
    };

    const handleAdd = () => {
        console.log(inputValue);
        const payload = {
            title: inputValue,
            status: false
        };

        const payloadjson = JSON.stringify(payload);

        fetch(`http://localhost:3004/todos`, {
            method: "POST",
            body: payloadjson,
            headers: {
                "content-type" : "application/json"
            }
        }).then((res) => {
            console.log(res)
            getTodos();
        })
        .catch((err) => setIsError(true))
        .finally(() => setIsLoading(false));
    };

    return isLoading ? (
        <div>...Loading</div>
    ) : isError ? (
        <div>Erro.. Something went wrong.</div>
    ) : (
        <div>
            <input
                placeholder="Add Todos"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleAdd}>Save</button>
            {   
                todos.map((item) => {

                    return <div>{item.title}</div>
                    
                })
            }
            <button onClick={() => setPage(page - 1)} disabled={page===1}>PREV</button>
            <button onClick={() => setPage(page + 1)} disabled={temp<3}>NEXT</button>
        </div>
    )
}

export default Todo;