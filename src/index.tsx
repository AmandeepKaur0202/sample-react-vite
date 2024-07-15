import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; 
import './index.css'; 
import App from './App'; 
import {store} from './app/store'; // Ensure RootState is correctly defined

ReactDOM.render(
<Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

