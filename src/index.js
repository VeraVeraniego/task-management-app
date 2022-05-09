import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { onError } from '@apollo/client/link/error'
import { API_TOKEN,API_URL } from './utils/constanst';

//error handling
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});


// Client definition for the ApolloProvider component
const client = new ApolloClient({

  cache: new InMemoryCache(),

  uri: `${API_URL}`,

  headers: {
		Authorization: `Bearer ${API_TOKEN}`,
	},

});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);