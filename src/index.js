import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/private-theming'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import './index.css'
import App from './App'
import theme from './theme'
import { CurrentUserProvider } from './contexts/currentUser'
import reportWebVitals from './reportWebVitals'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </ThemeProvider>
  </ApolloProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
