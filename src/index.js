import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/';

if (process.env.NODE_ENV === 'production') {
    const runtime = require('offline-plugin/runtime');
    runtime.install({
        onUpdateReady() {
            runtime.applyUpdate();
        },
        onUpdated() {
            window.location.reload();
        },
    });
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
