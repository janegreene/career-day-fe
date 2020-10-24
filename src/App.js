import React from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from './PageViews/LandingPage'
import HomePage from './PageViews/HomePage'
import JobDetails from './PageViews/JobDetails'
import { Route } from 'react-router-dom'

function App() {
  return (
    <>
    <main>
      <Route
        exact path = "/"
        render={() => {
          return (
            <LandingPage/>
          )
        }}
      />
      <Route 
        exact path = "/home-page"
        render={() => {
          return (
            <HomePage />
          )
        }}
      />
      <Route 
      path="/details:id"
      render={(props) => {
        return (
          <JobDetails {...props} />
        )
      }}
      />
    </main>
    </>
  );
}

export default App;
