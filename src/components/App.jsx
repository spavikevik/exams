import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Navigation from './Navigation';
import Landing from './Landing';
import Signup from './Signup';
import Signin from './Signin';
import PasswordForget from './PasswordForget';
import Home from './Home';
import Account from './Account';
import Exam from './Exam/Exam';
// import AdminDashboard from './AdminDashboard/Dashboard';
import StudentDashboard from './StudentDashboard/Dashboard';
// import Faculties from '../containers/Faculties';
// import Courses from '../containers/Courses';
import Exams from '../containers/Exams';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';
import StudentCourses from './StudentCourses';

const App = () =>
  (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route exact path={routes.LANDING} component={() => <Landing />} />
          <Route exact path={routes.SIGN_UP} component={() => <Signup />} />
          <Route exact path={routes.SIGN_IN} component={() => <Signin />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForget />} />
          <Route exact path={routes.HOME} component={() => <Home />} />
          <Route exact path={routes.ACCOUNT} component={() => <Account />} />
          <Route exact path={routes.EXAM} component={() => <Exam />} />
          {/* <AdminDashboard>
            <Route exact path={routes.ADMIN} component={() => <div />} />
            <Route exact path={routes.FACULTIES} component={() => <Faculties />} />
            <Route exact path={routes.COURSES} component={() => <Courses />} />
            <Route exact path={routes.EXAMS} component={() => <Exams />} />
          </AdminDashboard> */}
          <StudentDashboard>
            <Route exact path={routes.STUDENT_PROFILE} component={() => <div />} />
            <Route exact path={routes.STUDENT_COURSES} component={() => <StudentCourses />} />
            <Route exact path={routes.STUDENT_EXAMS} component={() => <Exams />} />
          </StudentDashboard>
        </Switch>
      </div>
    </Router>
  );

export default withAuthentication(App);
