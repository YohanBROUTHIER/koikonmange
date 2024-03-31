import { useLoaderData} from "react-router-dom";

import RecipeUX from "../../components/UXElements/components/RecipeUX";
import { RecipeApi } from "../../services/api";

export default function RecipePage() {
  const recipe = useLoaderData();
  
  return(
    <main className="section outlet">
      <RecipeUX inUpdate={true} formMethod={"PATCH"} recipe={recipe}/>
    </main>
  );
}

export async function loader({params}) {
  const recipe = await RecipeApi.get(params.id);
  return recipe;
}