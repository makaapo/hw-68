import React, {useState, FormEvent } from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch}  from '../../app/store';

const FormTodo: React.FC = () => {
  const [title, setTitle] = useState('');

  const changeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle (event.target.value)}

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
