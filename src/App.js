import React from 'react';
import {Link, BrowserRouter, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container'
import Register from './components/form/Register'
import Dashboard from './components/form/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Container>
        <div>
            <ul class="nav justify-content-end">
              <Link class="nav-item" to="/">
                <a class="nav-link active" href="#">Register</a>
              </Link>
              <Link class="nav-item" to="/dashboard">
                <a class="nav-link" href="#">Admin Dashboard</a>
              </Link>
            </ul>
            
          {/* <form align='right'>
              <Link to='/'>Register</Link>
              <Link to='/dashboard'>Dashboard</Link>
          </form> */}

            <Route path="/" component={Register} exact={true}/>
            <Route path="/dashboard" component={Dashboard} />
        </div>  
      </Container>
   </BrowserRouter>
  )
}
export default App;
