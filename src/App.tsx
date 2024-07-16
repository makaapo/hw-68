import React from 'react';
import FormTodo from './components/FormTodo/FormTodo';

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <h1>Todo App</h1>
      <FormTodo />
    </div>
  );
};

export default App;