import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'antd/dist/antd.css';
import { autorun } from 'mobx';
import { RootStore } from './stores';
import { loadState, saveState } from './utils/localStore';
import { Provider } from 'mobx-react';


// Store init
const initState = loadState();
const mobXStore = new RootStore(initState);
autorun(() => {
    console.dir(mobXStore);
    saveState(mobXStore.serialize());
}, { delay: 1000 });

ReactDOM.render(<Provider {...mobXStore}><App /></Provider>, document.getElementById('root'));