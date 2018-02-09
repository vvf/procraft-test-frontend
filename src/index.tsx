import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import RegisterFormView from "./views/RegisterFormView";

ReactDOM.render(
  <RegisterFormView />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
