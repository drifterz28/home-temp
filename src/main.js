import {render} from 'react-dom';
import React from 'react';
import { Auth0Provider } from "./react-auth0-wrapper";

import config from "./auth_config.json";
import App from './components/app';

const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
    responseType='id_token token'
  >
    <App />
  </Auth0Provider>,
  document.getElementById('app')
)
