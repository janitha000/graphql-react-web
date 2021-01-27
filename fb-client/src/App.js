import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import NavBar from './components/NavBar'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>

    </ApolloProvider>
  );
}

export default App;
