import {render} from 'react-dom';
import React from 'react';

import config from "./auth_config.json";
import App from './components/app';

render(
  <App />,
  document.getElementById('app')
);
