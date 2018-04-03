import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

//styles
import 'semantic-ui-css/semantic.min.css'
import 'styles/main.scss'

const container = document.getElementById('app-container');

ReactDOM.render(
    <App/>,
    container
);

// Are we in development mode?
if (module.hot) {
    // Whenever a new version of App.js is available
    module.hot.accept('./app', function () {
        console.log("asdf");
        // Require the new version and render it instead
        ReactDOM.render(<div>asdf</div>, container)
    })
}