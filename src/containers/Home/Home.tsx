import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import TodoItem from '../../components/TodoItem/TodoItem';
import Spinner from '../../components/Spinner/Spinner';
import {fetchTasks} from '../todoThunks';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isLoading = useSelector((state: RootState) => state.tasks.isLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      {isLoading ? <Spinner/> :
        <>
          <hr/>
          <div className="tasksList mx-auto">
            {tasks.length > 0 ?
              <>
                {tasks.map(task => (
                  <TodoItem key={task.id} task={task}/>
                ))}
              </>
              : <h4 className="text-center">No tasks</h4>
            }
          </div>
        </>
      }
    </div>
  );
};

export default Home;