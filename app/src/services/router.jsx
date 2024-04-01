/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Outlet } from "react-router-dom";

import {
  Account, App, DietPreferences, Error404, Favorites, favoritesLoader, FilterPanel, filterPanelLoader, History, historyLoader,
  Home, Main, Profile, ProfileUser, Proposal, proposalLoader, Proposition, Recipe, recipeLoader, Recipes,
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
        loader: eh(action.mainLoader), element: <Main/>,
        children: [
          { index: true, element: <Home /> },
          { path: "history", element: <History />, loader: eh(historyLoader) },
          { path: "recipes/new", element: <Recipe formMethod="POST" />, loader: eh(recipeLoader(true)), action:eh(action.recipe) },
          { path: "recipes/:id", element: <Recipe formMethod="PATCH" />, loader: eh(recipeLoader(false)), action:eh(action.recipe) },
          { path: "reset-password", element: <ResetPassword />, action: eh(action.resetPassword) },
          { path: "signin", element: <Signin />, action: eh(action.signin) },
          { path: "signup", element: <Signup />, action: eh(action.signup) },
          { path: "signout", action: eh(action.signout) },
          { path: "validate/account/:uuid", element: <></>, loader: eh(validateAccountLoader) },
          { path: "validate/password/:uuid", element: <ValidatePassword />, action: eh(action.validatePassword) }
        ]
      },
      {
        loader: eh(filterPanelLoader), element: <FilterPanel/>,
        children: [
          { path: "favorites", element: <Recipes />,loader: eh(recipesLoader(true)), action: eh(action.recipe) },
          { path: "proposal", element: <Proposal />, loader: eh(proposalLoader) },
          { path: "recipes", element: <Recipes />,loader: eh(recipesLoader(false)), action: eh(action.recipe) }
        ]
      },
      {
        path: "/profile", loader: eh(action.mainLoader), element: <Profile/>,
        children: [
          { path: "dashboard", element: <ProfileUser/> },
          { path: "account", element: <Account/> },
          { path: "diet-preferences", element: <DietPreferences/> }
        ]
      }
    ],
  },								
]);