import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Task} from '../../containers/tasksSlice';
import {AppDispatch, RootState} from '../../app/store';
import Spinner from '../Spinner/Spinner';
import {DeleteTask, EditTask} from '../../containers/todoThunks';

interface TaskItemProps {
  task: Task;
}

const TodoItem: React.FC<TaskItemProps> = ({task}) => {
  const dispatch: AppDispatch = useDispatch();
  const {isLoading} = useSelector((state: RootState) => state.tasks);


  const switchTask = async () => {
    const updatedTask = {...task, completed: !task.completed};
    await dispatch(EditTask(updatedTask));
  };

  const onDeleteTask = async () => {
    await dispatch(DeleteTask(task.id));
  };

  return (
    <div className="d-flex align-items-center mb-3 border border-secondary-subtle p-2 rounded-2">
      <input
        className="form-check-input me-2"
        type="checkbox"
        checked={task.completed}
        onChange={switchTask}
      />
      <span className={`flex-grow-1 ${task.completed ? 'text-decoration-line-through' : ''}`}>
        {task.title}
      </span>
      <button className="btn btn-danger ms-3" onClick={onDeleteTask}>
        {isLoading ? (
          <Spinner/>
        ) : (
          'Delete'
        )}
      </button>
    </div>
  );
};

export default TodoItem;
