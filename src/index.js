import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

//styles
import 'semantic-ui-css/semantic.min.css'
import 'styles/main.scss'

const render = (component) => {
    ReactDOM.render(
        component,
        document.getElementById('app-container')
    );
};

render(<App/>)

// Are we in development mode?
if (module.hot) {
    // Whenever a new version of App.js is available
    module.hot.accept('./app', function () {
        const App = require('app').default;
        // Require the new version and render it instead
        render(<App/>);
    })
}