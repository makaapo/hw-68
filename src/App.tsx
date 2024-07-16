import React from 'react';
import FormTodo from './components/FormTodo/FormTodo';
import Home from './containers/Home/Home';

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <h1>Todo App</h1>
      <FormTodo />
      <Home />
    </div>
  );
};

export default App;