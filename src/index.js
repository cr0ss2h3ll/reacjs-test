import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './Utils/registerServiceWorker';
import './semantic/dist/components/grid.css';
import './semantic/dist/components/container.css';
import './semantic/dist/components/modal.css';
import './semantic/dist/components/divider.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
