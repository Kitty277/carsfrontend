import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import InitialHome from './pages/InitialHome'; // Import the InitialHome component
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={InitialHome} /> {/* Use InitialHome for the root path */}
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <ProtectedRoute path='/booking/:carid' exact component={BookingCar} />
          <ProtectedRoute path='/userbookings' exact component={UserBookings} />
          <ProtectedRoute path='/addcar' exact component={AddCar} />
          <ProtectedRoute path='/editcar/:carid' exact component={EditCar} />
          <ProtectedRoute path='/admin' exact component={AdminHome} />
          <Route path='/home' exact component={Home} /> {/* Use Home for the /home path */}
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

export function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('user') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
