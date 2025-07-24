import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigation from './src/navigation';
import "./global.css"


export default function App() {
  return (
      <Provider store={store}>
          <AppNavigation />
      </Provider>
  );
}