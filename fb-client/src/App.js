import './App.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'
import { AuthProvider } from './contexts/auth'
import { setContext } from 'apollo-link-context'
import AuthRoute from './util/AuthRoute'



import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import NavBar from './components/NavBar'
import SinglePost from './components/Posts/SinglePost'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwt-token')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  //link: httpLink,
  cache: new InMemoryCache(),

});




function App() {
  return (
    <AuthProvider >
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Router>
            <NavBar />
            <div className="container">
              <div className="left"></div>
              <div className="middle">
                <Route exact path="/" component={Home} />
                <Route exact path="/posts/:postId" component={SinglePost} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/register" component={Register} /></div>
              <div className="right"></div>
            </div>
          </Router>
        </ApolloHooksProvider>
      </ApolloProvider>
    </AuthProvider>

  );
}

export default App;
