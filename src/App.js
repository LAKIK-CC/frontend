import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ChakraProvider, List } from '@chakra-ui/react';
import { Provider } from 'unistore/react';
import { store } from './config/store/Store.js';
import theme from './config/theme/Theme.js';
import ROUTE from './config/api/Route.js';
import { AuthenticationChecker, isAuthenticate } from './config/middleware/Middleware.js';
import Login from './routes/login/Login.js';
import Register from './routes/register/Register.js';
import CreateKamar from './routes/createKamar/CreateKamar.js';
import Dashboard from './routes/dashboard/Dashboard.js';
import './config/middleware/Axios.js';
import ListKamar from './routes/kamar/ListKamar.js';
import UpdateKamar from './routes/updateKamar/UpdateKamar.js';
import NotFound from './routes/not-found/NotFound.js';

const App = () => {

	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					<Routes>
						<Route path={ROUTE.DASHBOARD} element={<ListKamar />} />
						<Route exact path={ROUTE.LOGIN} element={<Login />} />
						<Route exact path={ROUTE.REGISTER} element={<Register />} />
						<Route exact path={ROUTE.CREATE_KAMAR} element={
							<AuthenticationChecker>
								<CreateKamar />
							</AuthenticationChecker>} 
						/>
						<Route exact path={ROUTE.EDIT_KAMAR} element={
							<AuthenticationChecker>
								<UpdateKamar />
							</AuthenticationChecker>} 
						/>
						<Route path='*' element={<NotFound />} />
					</Routes>	
				</Router>
			</ChakraProvider>
		</Provider>
		
	</div>);
}

export default App;
