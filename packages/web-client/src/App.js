/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import modules from './pages';

const App = () => (
  <Routes>
    {modules.map(module => (
      <Route path={module.routeProps.path} element={module.routeProps.element} />))}
    {/* <Route path=''/> */}
  </Routes>
  );

export default App;
