import ReactGA from 'react-ga';

import './App.scss';

import DeepDive from './components/deepdive';
import FAQ from './components/faq';
import Navbar from './components/navbar';
import PatientDB from './components/patientdb';
import Resources from './components/resources';
import State from './components/state';
import ScrollToTop from './utils/ScrollToTop';

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useLocalStorage } from 'react-use';

const PUBLIC_URL = process.env.PUBLIC_URL;

function initializeTracking() {
  console.log(window.location.pathname + window.location.search);
  
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function App() {
  const pages = [
    {
      pageLink: `${PUBLIC_URL}/`,
      view: State,
      displayName: 'Home',
      animationDelayForNavbar: 0.2,
      showInNavbar: true,
    },
    {
      pageLink: `${PUBLIC_URL}/demographics`,
      view: PatientDB,
      displayName: 'Demographics',
      animationDelayForNavbar: 0.3,
      showInNavbar: false,
    },
    {
      pageLink: `${PUBLIC_URL}/deepdive`,
      view: DeepDive,
      displayName: 'Deep Dive',
      animationDelayForNavbar: 0.4,
      showInNavbar: true,
    },
    {
      pageLink: `${PUBLIC_URL}/essentials`,
      view: Resources,
      displayName: 'Essentials',
      animationDelayForNavbar: 0.5,
      showInNavbar: true,
    },
    {
      pageLink: `${PUBLIC_URL}/faq`,
      view: FAQ,
      displayName: 'FAQ',
      animationDelayForNavbar: 0.6,
      showInNavbar: false,
    },
    {
      pageLink: `${PUBLIC_URL}/state/:stateCode`,
      view: State,
      displayName: 'State',
      animationDelayForNavbar: 0.7,
      showInNavbar: false,
    },
  ];

  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  React.useEffect(() => {
    if (darkMode) {
      document.querySelector('body').classList.add('dark-mode');
    } else {
      document.querySelector('body').classList.remove('dark-mode');
    }
    ReactGA.initialize('UA-164643845-1');
  }, [darkMode]);
  initializeTracking();
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Router>
        <ScrollToTop />
        <Route
          render={({ location }) => (
            <div className="Almighty-Router">
              <Navbar
                pages={pages}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
              <Switch location={location}>
                {pages.map((page, index) => {
                  return (
                    <Route
                      exact
                      path={page.pageLink}
                      component={page.view}
                      key={index}
                    />
                  );
                })}
                <Redirect to={PUBLIC_URL || '/'} />
              </Switch>
            </div>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
