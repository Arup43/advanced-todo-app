import { useGetTodosQuery } from "../features/api/apiSlice";
import Todo from "./Todo";
import tickImage from "../assets/images/double-tick.png";
import { useUpdateStatusMutation, useDeleteTodoMutation } from "../features/api/apiSlice";
import { useSelector } from "react-redux";

export default function TodoList() {

    const { data: todos, isLoading, isError } = useGetTodosQuery();
    const [updateStatus] = useUpdateStatusMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const { selectedStatus, selectedColors } = useSelector(state => state.filter);

    const filterByStatus = (todo) => {
        if(selectedStatus === 'all') {
            return true;
        } else if(selectedStatus === 'completed') {
            return todo.completed;
        } else if(selectedStatus === 'incomplete') {
            return !todo.completed;
        }
    };

    const filterByColors = (todo) => {
        if (selectedColors.length > 0) {
            return selectedColors.includes(todo?.color);
        }
        return true;
    };

    //decide what to render
    let content = null;

    if (isLoading) {
        content = <h3>Loading...</h3>;
    }

    if (!isLoading && isError) {
        content = <h3>There is an Error!</h3>;
    }

    if (!isLoading && !isError && todos?.length === 0) {
        content = <h3>No Todos!</h3>;
    }

    if (!isLoading && !isError && todos?.length > 0) {
        content = todos.filter(filterByStatus).filter(filterByColors).map((todo) => <Todo key={todo.id} todo={todo} />);
    }


    const completeAllHandler = () => {
        todos.forEach((todo) => {
            if (!todo.completed) {
                updateStatus({
                    id: todo.id,
                    updatedStatus: {
                        completed: true,
                    }
                });
            }
        });
    };

    const clearCompletedHandler = () => {
        todos.forEach((todo) => {
            if (todo.completed) {
                deleteTodo(todo.id);
            }
        });
    };




    return (
        <div className="mt-2 text-gray-700 text-sm max-h-[400px] overflow-y-auto">
            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li
                    className="flex space-x-1 cursor-pointer"
                    onClick={completeAllHandler}
                >
                    <img className="w-4 h-4" src={tickImage} alt="Complete" />
                    <span>Complete All Tasks</span>
                </li>
                <li className="cursor-pointer" onClick={clearCompletedHandler}>
                    Clear completed
                </li>
            </ul>
            <hr></hr>
            {content}
        </div>
    );
}
