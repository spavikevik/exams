import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Navigation from './Main/Navigation';
import Landing from './Main/Landing';
import Home from './Main/Home';

import Account from './Account/Account';
import Signup from './Account/Signup';
import Signin from './Account/Signin';
import PasswordForget from './Account/PasswordForget';

import Exam from './Exam/Exam';
// import AdminDashboard from './AdminDashboard/Dashboard';
import StudentDashboard from './Student/Dashboard';
// import Faculties from '../containers/Faculties';
// import Courses from '../containers/Courses';
import Exams from '../containers/AdminDashboard/Exams/Exams';

import * as routes from '../constants/routes';
import withAuthentication from './Auth/withAuthentication';
import StudentCourses from './Student/StudentCourses';

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
