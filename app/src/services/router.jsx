/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";

import {
  Account, App, DietPreferences, Error404, Favorites, favoritesLoader, History, historyLoader,
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
          { path: "/recipes/:id",element: <Recipe />, loader: eh(recipeLoader), action:eh(action.recipe) },
          { path: "/reset-password", element: <ResetPassword />, action: eh(action.resetPassword) },
          { path: "/signin", element: <Signin />, action: eh(action.signin) },
          { path: "/signup", element: <Signup />, action: eh(action.signup) },
          { path: "/validate/account/:uuid", element: <></>, loader: eh(validateAccountLoader) },
          { path: "/validate/password/:uuid", element: <ValidatePassword />, action: eh(action.validatePassword) }
        ]
      },
      {
        loader:()=>null, element: <Outlet/>,
        children: [
          { path: "/favorites", element: <Favorites />,loader:eh(favoritesLoader), action:eh(action.recipe) },
          { path: "/proposal", element: <Proposal />, loader:eh(proposalLoader) },
          { path: "/recipes", element: <Recipes />,loader:eh(recipesLoader), action:eh(action.recipe) }
        ]
      },
      {
        path: "/profile", loader:()=>null, element: <Outlet/>,
        children: [
          { index:true, element: <ProfileUser/> },
          { path: "account", element: <Account/> },
          { path: "diet-preferences", element: <DietPreferences/> }
        ]
      }
    ],
  },								
]);