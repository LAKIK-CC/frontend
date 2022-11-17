import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'unistore/react';
import { store } from './config/store/Store.js';
import theme from './config/theme/Theme.js';
import ROUTE from './config/api/Route.js';
// import { AuthenticationChecker } from './config/middleware/Middleware.js';
import Login from './routes/login/Login.js';
import Register from './routes/register/Register.js';
import CreateForm from './routes/createForm/CreateForm.js';
import './config/middleware/Axios.js';
import UpdateForm from './routes/updateForm/UpdateForm.js';

const App = () => {
	return (<div id="app">
		<Provider store={store}>
			<ChakraProvider theme={theme}>
				<Router>
					{/* <AuthenticationChecker path="/:*?"> */}
							{/* <Router>
                <Route exact path={ROUTE.DASHBOARD} element={<Dashboard />} />
                <Route exact path={ROUTE.CREATE_KAMAR} element={<CreateKamar />} />
                <Route path={ROUTE.DETAIL_KAMAR} element={<DetailKamar />} />
                <Route path={ROUTE.EDIT_KAMAR} element={<EditKamar />} />
							</Router> */}
					{/* </AuthenticationChecker> */}
          <Routes>
            <Route exact path={ROUTE.LOGIN} element={<Login />} />
            <Route exact path={ROUTE.REGISTER} element={<Register />} />
			<Route exact path={ROUTE.CREATE_KAMAR} element={<CreateForm />} />
			<Route exact path={ROUTE.EDIT_KAMAR} element={<UpdateForm />} />
          </Routes>	
				</Router>
			</ChakraProvider>
		</Provider>
		
	</div>);
}

export default App;
