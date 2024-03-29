import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from './store/index.jsx';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Error404 from './components/Roots/ErrorElement/Error404/Error404.jsx'

import './styles/index.css';

import App from './App.jsx'
import Home from './components/Roots/Home/index.jsx';
import { homeLoader } from './components/Roots/Home/homeLoader.js';
import Proposal from './components/Roots/Proposal/index.jsx';
import { proposalLoader } from './components/Roots/Proposal/proposalLoader.js';
import Favorites from './components/Roots/Favorites/index.jsx';
import { favoritesLoader } from './components/Roots/Favorites/favoritesLoader.js';
import History from './components/Roots/History/index.jsx';
import { historyLoader } from './components/Roots/History/historyLoader.js';
import SignIn from './components/Roots/SignIn/index.jsx';
import { signinLoader } from './components/Roots/SignIn/signinLoader.js';
import { signInAction } from './components/Actions/signInAction.js';
import SignUp from './components/Roots/SignUp/index.jsx';
import { signUpAction } from './components/Actions/signUpAction.js';
import { signupLoader } from './components/Roots/SignUp/signupLoader.js';
import ResetPassword from './components/Roots/ResetPassword/index.jsx';
import { resetPasswordAction } from './components/Actions/resetPasswordAction.js';
import Recipes from './components/Roots/Recipes/index.jsx';
import { recipesLoader } from './components/Roots/Recipes/recipesLoader.js';
import Recipe from './components/Roots/Recipe/index.jsx';
import { recipeLoader } from './components/Roots/Recipe/recipeLoader.js';
import ValidatePassword from './components/Roots/Validate/validatePassword.jsx';
import { validatePasswordAction } from './components/Actions/validatePasswordAction.js';
import Profil from './components/Roots/Profile/index.jsx';
import ProfilUser from './components/Roots/Profile/ProfileUser/index.jsx';
import { profilLoader } from './components/Roots/Profile/profilLoader.js';
import DietPreferences from './components/Roots/Profile/DietPreferences/index.jsx';
import Account from './components/Roots/Profile/Account/index.jsx';
import { accountAction } from './components/Actions/accountAction.js';
import { validateAccountLoader } from './components/Roots/Validate/validateAccountLoader.js';
// import { asideLoader } from './components/Layout/Partials/Aside/index.jsx';
import { recipeAction } from './components/Actions/recipeAction.js';

import eh from './helpers/errorHandler.js'

const router = createBrowserRouter([									
	{								
		path: "",							
		element: <App />,
    // loader: eh(asideLoader)	
		// errorElement: <Error404 />,									
		children: [							
      { path:"/", element: <Home />, loader:eh(homeLoader)},
      { path: "/favorites", element: <Favorites />,loader:eh(favoritesLoader), action:eh(recipeAction),  },
      { path: "/proposal", element: <Proposal />, loader:eh(proposalLoader) },
      { path: "/history", element: <History />, loader:eh(historyLoader) },
      { path: "/signin", element: <SignIn />, loader:eh(signinLoader), action: eh(signInAction) },
      { path: "/signup", element: <SignUp />, loader:eh(signupLoader) ,action: eh(signUpAction)},
      { path: "/reset-password", element: <ResetPassword />, action: eh(resetPasswordAction) },
      { path: "/recipes", element: <Recipes />,loader:eh(recipesLoader), action:eh(recipeAction)  },
      { path: "/recipes/:id",element: <Recipe />, loader: eh(recipeLoader), action:eh(recipeAction) },
      { path: "/validate/account/:uuid", element: <></>, loader: eh(validateAccountLoader) },
      { path: "/validate/password/:uuid", element: <ValidatePassword />, action: eh(validatePasswordAction) },
      { path: "/profil", element:<Profil />, 
      children: [
        { index:true, element: <ProfilUser/>, loader:eh(profilLoader) },
        { path: "diet-preferences", element: <DietPreferences/> },
        { path: "account", element: <Account/>, action:eh(accountAction) },
      ]}		
		],
	},								
]);	


ReactDOM.createRoot(document.getElementById('root')).render(			
  <React.StrictMode>	
    <Provider store={store}>
      <RouterProvider router={router} />	
    </Provider>
    <ToastContainer />	
  </React.StrictMode>			
);		
