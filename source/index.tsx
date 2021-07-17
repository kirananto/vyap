import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { InitialRouter } from './App';

ReactDOM.render(
  <React.StrictMode>
    <InitialRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

if (import.meta.hot) {
  import.meta.hot.accept();
}
