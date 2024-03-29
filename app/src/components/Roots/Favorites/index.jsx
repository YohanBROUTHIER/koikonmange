import './Favorites.css';
import { useEffect } from 'react';
import Meal from './Meal';
import AddPlus from '../../Layout/UXElements/icons/AddPlus';
import { FaSquareMinus } from 'react-icons/fa6';
import { useState } from 'react';
import RecipeUX from '../../Layout/UXElements/components/RecipeUX';
import OrderByComponent from '../../Layout/UXElements/components/OrderByComponent';
import { useLoaderData } from 'react-router-dom';
import SearchForm from '../../Layout/UXElements/components/SearchForm';
import { useSelector } from 'react-redux';

const Favorites = () => {

    // const favorites = useLoaderData();
    const {favorites} = useSelector((state) => state.favorites);
    
    const [favoritesCopy, setCopy] = useState(favorites);
    const [openModeCreator, setCreatorMode] = useState(false);
    

    useEffect(() => {
        setCopy(favorites)
    }, [favorites])

    const handleChangeSearch = (event) => {
        if (event.target.value.length === 0) setCopy(favorites)
        const searchedRecipes = favorites.filter((recipe) => recipe.name.toLowerCase().startsWith(event.target.value));
        setCopy(searchedRecipes);
    }


    const handleClickAddRecipe = () => {
        setCreatorMode((current) => !current) 
    }

    
    return(
        <main className="main outlet" style={{ gridColumn: '2 / -1', overflowY:"scroll", overflowX:"hidden"}}>
            <section className="section">
                <div className="section__divForm">
                <h2>Favoris</h2>
                    <div>
                        <SearchForm handleChangeSearch={handleChangeSearch}/>
                        <OrderByComponent />
                    </div>
                </div>

                <div className="section__addRecipe">
                {!openModeCreator?
                    <AddPlus handleClick={handleClickAddRecipe}/>
                    :
                    <FaSquareMinus onClick={handleClickAddRecipe}/>
                    }
                </div>

                {openModeCreator&&
                    <div className="backdrop">
                        <RecipeUX modal={"modal"} formMethod={"POST"} cancelHandler={() => setCreatorMode(false)} favorite={true}/>
                    </div>
                    }

                {favoritesCopy.length > 0 &&
                    favoritesCopy.map((meal, index) => {
                        return(
                        <Meal key={index} meal={meal}/>
                        )
                    }) 
                }

            </section>
        </main>
    )
}

export default Favorites;