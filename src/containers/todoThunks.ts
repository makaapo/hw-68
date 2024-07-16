import {createAsyncThunk} from '@reduxjs/toolkit';
import {Task} from './tasksSlice';
import axiosApi from '../axiosApi';
import {RootState} from '../app/store';
import {toast} from 'react-toastify';


export const fetchTasks:unknown = createAsyncThunk<Task[], void, {state: RootState}>(
  'tasks/fetch',
  async () => {
    const {data} = await axiosApi.get<Record<string, Task>>('/tasks.json');
    const todos: Task[] = Object.keys(data).map((id) => ({
      ...data[id],
      id,
    }));
    return todos;
  }
);

export const AddNewTask:unknown = createAsyncThunk<Task, string>(
  'tasks/add',
  async (title) => {
    const newTodo = {title, completed: false};
    const {data} = await axiosApi.post<{ name: string }>('/tasks.json', newTodo);
    toast.success('Task added');
    return {...newTodo, id: data.name};
  }
);

export const EditTask: unknown = createAsyncThunk<Task, Task, {state: RootState}>(
  'tasks/edit',
  async (task) => {
    await axiosApi.put(`/tasks/${task.id}.json`, task);
    toast.success('Task edited');
    return task;
  }
);
export const DeleteTask: unknown = createAsyncThunk<string, string, {state: RootState}>(
  'tasks/delete',
  async (id) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      await axiosApi.delete(`/tasks/${id}.json`);
      toast.success('Task deleted');
      return id;
    }
  }
);