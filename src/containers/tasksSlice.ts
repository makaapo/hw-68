import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddNewTask, DeleteTask, EditTask, fetchTasks} from './todoThunks';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: false,
};

const tasksSlice = createSlice<unknown>({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state: TasksState) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchTasks.fulfilled, (state: TasksState, action: PayloadAction<Task[]>) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state: TasksState) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(AddNewTask.fulfilled, (state: TasksState, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(AddNewTask.pending, (state: TasksState) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(AddNewTask.rejected, (state: TasksState) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(EditTask.fulfilled, (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      state.isLoading = false;
    });
    builder.addCase(EditTask.pending, (state: TasksState) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(EditTask.rejected, (state: TasksState) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(DeleteTask.fulfilled, (state: TasksState, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(DeleteTask.pending, (state: TasksState) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(DeleteTask.rejected, (state: TasksState) => {
      state.isLoading = false;
      state.error = true;
    });

  },
});

export default tasksSlice.reducer;