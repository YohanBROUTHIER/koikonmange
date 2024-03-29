import { useLoaderData} from "react-router-dom";

import RecipeUX from "../../Layout/UXElements/components/RecipeUX";
import { RecipeApi } from "../../../api"
import store from "../../../store";
import types from "../../../store/reducers/types";

export default function RecipePage() {
  const recipe = useLoaderData();
  
  return(
    <main className="section outlet">
      <RecipeUX inUpdate={true} formMethod={"PATCH"} recipe={recipe}/>
    </main>
  )
}