import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'


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
      <ApolloHooksProvider client={client}>
        <Router>
          <NavBar />
          <div className="container">
            <div className="left"></div>
            <div className="middle">
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} /></div>
            <div className="right"></div>
          </div>



        </Router>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
