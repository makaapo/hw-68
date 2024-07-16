import React, {FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../app/store';
import {AddNewTask} from '../../containers/todoThunks';

const FormTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const changeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(AddNewTask(title));
    setTitle('');
  };

  return (
    <form className="mb-3" onSubmit={submitForm}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={changeForm}
          placeholder="Enter new task"
          required
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default FormTodo;
