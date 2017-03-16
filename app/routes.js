import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import Welcome from './components/welcome';
import Dashboard from './components/admin/dashboard';
import Questionaire from './components/admin/questionaire';

import RequireAuth from './components/auth/require_auth';


export default (
	<Route path="/" component={App}>
		<IndexRoute component={Welcome} />
		<Route path="signin" component={Signin} />
		<Route path="signout" component={Signout} />
		<Route path="signup" component={Signup} />
		<Route path="feature" component={RequireAuth(Feature)} />
		<Route path="questionaire" component={RequireAuth(Dashboard)} />
		<Route path="questionaire/:id" component={RequireAuth(Questionaire)} />
		<Route path="questionaire/new" component={RequireAuth(Questionaire)} />
	</Route>
);
