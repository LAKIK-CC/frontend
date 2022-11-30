import React from 'react';
import { BrowserRouter as Router, Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'unistore/react';
import { store } from './config/store/Store.js';
import theme from './config/theme/Theme.js';
import ROUTE from './config/api/Route.js';
import { AuthenticationCheckerToDashboard, AuthenticationCheckerToLogin } from './config/middleware/Middleware.js';
import Login from './routes/login/Login.js';
import Register from './routes/register/Register.js';
import CreateKamar from './routes/createKamar/CreateKamar.js';
import Dashboard from './routes/dashboard/Dashboard.js';
import './config/middleware/Axios.js';
import UpdateKamar from './routes/updateKamar/UpdateKamar.js';
import NotFound from './routes/not-found/NotFound.js';

const App = () => {

	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<Routes>
						<Route exact path={ROUTE.LOGIN} element={
							<AuthenticationCheckerToDashboard>
								<Login />
							</AuthenticationCheckerToDashboard>} 
						/>
						<Route exact path={ROUTE.REGISTER} element={
							<AuthenticationCheckerToDashboard>
								<Register />
							</AuthenticationCheckerToDashboard>} 
						/>
						<Route exact path={ROUTE.CREATE_KAMAR} element={
							<AuthenticationCheckerToLogin>
								<CreateKamar />
							</AuthenticationCheckerToLogin>} 
						/>
						<Route exact path={ROUTE.EDIT_KAMAR} element={
							<AuthenticationCheckerToLogin>
								<UpdateKamar />
							</AuthenticationCheckerToLogin>} 
						/>
						<Route exact path={ROUTE.DASHBOARD} element={
							<AuthenticationCheckerToLogin>
								<Dashboard />
							</AuthenticationCheckerToLogin>} 
						/>
						<Route path='*' element={<NotFound />} />
					</Routes>	
				</Router>
			</ChakraProvider>
		</Provider>
		
	</div>);
}

export default App;
