import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import MuiTheme from './theme';
//import history from './history';

// Layout Blueprints

import { LeftSidebar, PresentationLayout } from './layout-blueprints';

// Example Pages

import Buttons from './example-pages/Buttons';
import Dropdowns from './example-pages/Dropdowns';
import NavigationMenus from './example-pages/NavigationMenus';
import Pagination from './example-pages/Pagination';
import Scrollable from './example-pages/Scrollable';
import Badges from './example-pages/Badges';
import Icons from './example-pages/Icons';
import UtilitiesHelpers from './example-pages/UtilitiesHelpers';
import RegularTables1 from './example-pages/RegularTables1';
import FormsControls from './example-pages/FormsControls';

const DashboardDefault = lazy(() => import('./example-pages/DashboardDefault'));
const LandingPage = lazy(() => import('./example-pages/LandingPage'));
const Notifications = lazy(() => import('./example-pages/Notifications'));
const Popovers = lazy(() => import('./example-pages/Popovers'));
const Tabs = lazy(() => import('./example-pages/Tabs'));
const ListGroups = lazy(() => import('./example-pages/ListGroups'));

const Routes = () => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
              <div className="w-50 mx-auto">Loading...</div>
            </div>
          }>
          <Switch>
            <Redirect exact from="/" to="/LandingPage" />
            <Route path={['/LandingPage']}>
              <PresentationLayout>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route path="/LandingPage" component={LandingPage} />
                  </motion.div>
                </Switch>
              </PresentationLayout>
            </Route>

            <Route
              path={[
                '/DashboardDefault',
                '/Buttons',
                '/Dropdowns',
                '/NavigationMenus',
                '/Pagination',
                '/Scrollable',
                '/Badges',
                '/Icons',
                '/UtilitiesHelpers',
                '/Notifications',
                '/Popovers',
                '/Tabs',
                '/RegularTables1',
                '/FormsControls',
                '/ListGroups'
              ]}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <Route
                      path="/DashboardDefault"
                      component={DashboardDefault}
                    />
                    <Route path="/Buttons" component={Buttons} />
                    <Route path="/Dropdowns" component={Dropdowns} />
                    <Route
                      path="/NavigationMenus"
                      component={NavigationMenus}
                    />
                    <Route path="/Pagination" component={Pagination} />
                    <Route path="/Scrollable" component={Scrollable} />
                    <Route path="/Badges" component={Badges} />
                    <Route path="/Icons" component={Icons} />
                    <Route
                      path="/UtilitiesHelpers"
                      component={UtilitiesHelpers}
                    />
                    <Route path="/Notifications" component={Notifications} />
                    <Route path="/Popovers" component={Popovers} />
                    <Route path="/Tabs" component={Tabs} />
                    <Route path="/RegularTables1" component={RegularTables1} />
                    <Route path="/FormsControls" component={FormsControls} />
                    <Route path="/ListGroups" component={ListGroups} />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default Routes;
