/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";

import App from '../App.jsx';
import {
  Account, DietPreferences, Error404, Favorites, favoritesLoader, History, historyLoader,
  Home, Profile, ProfileUser, Proposal, proposalLoader, Proposition, Recipe, recipeLoader, Recipes,
  recipesLoader, ResetPassword, Signin, Signup, validateAccountLoader, ValidatePassword
} from '../containers/index.js';
import action from "../actions/index.js";

import eh from '../utils/errorHandler.js';

export default createBrowserRouter([									
  {								
    path: "/",							
    element: <App />,
    // errorElement: <Error404 />,									
    children: [
      {
        path: "/", loader:()=>null, element: <Outlet/>,
        children: [
          { index: true, element: <Home /> },
          { path: "/history", element: <History />, loader:eh(historyLoader) },
          { path: "/signin", element: <Signin />, action: eh(action.signin) },
          { path: "/signup", element: <Signup />, action: eh(action.signup) },
          { path: "/reset-password", element: <ResetPassword />, action: eh(action.resetPassword) },
          { path: "/validate/account/:uuid", element: <></>, loader: eh(validateAccountLoader) },
          { path: "/validate/password/:uuid", element: <ValidatePassword />, action: eh(action.validatePassword) },
          { path: "/recipes/:id",element: <Recipe />, loader: eh(recipeLoader), action:eh(action.recipe) }
        ]
      },
      {
        loader:()=>null, element: <Outlet/>,
        children: [
          { path: "/favorites", element: <Favorites />,loader:eh(favoritesLoader), action:eh(action.recipe) },
          { path: "/recipes", element: <Recipes />,loader:eh(recipesLoader), action:eh(action.recipe) },
          { path: "/proposal", element: <Proposal />, loader:eh(proposalLoader) },
        ]
      },
      {
        path: "/profile", loader:()=>null, element: <Outlet/>,
        children: [
          { index:true, element: <ProfileUser/> },
          { path: "diet-preferences", element: <DietPreferences/> },
          { path: "account", element: <Account/> }
        ]
      }
    ],
  },								
]);