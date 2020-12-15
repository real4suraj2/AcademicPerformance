import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './screens/Login';
import Admin from './screens/Admin';
import Student from './screens/Student';
import Teacher from './screens/Teacher';
import create from 'zustand';

export const useStore = create(set => ({
  user: null,
  signIn: (user) => set({user}),
  signOut: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('username');
    localStorage.removeItem('kind');
    set({user: null});
  },
  fetch: () => {
    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const username = localStorage.getItem('username');
    const kind = localStorage.getItem('kind');
    set({user: {token, firstName, lastName, username, kind}});
  }
}))

export default function App() {
    const fetch = useStore(state => state.fetch);
    useEffect(() => fetch());
    return (
      <div className="h-100">
        <Switch>
          <LoginRoute path="/" exact>
            <Login/>
          </LoginRoute>
           <PrivateRoute path="/student" kind="student">
              <Student />
            </PrivateRoute>
           <PrivateRoute path="/admin" kind="admin">
              <Admin />
            </PrivateRoute>
           <PrivateRoute path="/teacher" kind="teacher">
              <Teacher />
            </PrivateRoute>
        </Switch>
      </div>
    );
}

function PrivateRoute({ children, kind, ...rest }) {
  const user = useStore(state => state.user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user != null && user.kind === kind ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function LoginRoute({ children, ...rest }) {
  const user = useStore(state => state.user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user === null || user.kind === null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/" + user.kind,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
