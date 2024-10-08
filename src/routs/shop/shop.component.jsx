import { Routes , Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import "./shop.styles";
import Category from "../category/category.component";
import { setCategories } from "../../store/categories/category.action";



const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoriesArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoriesArray));
        }
        getCategoriesMap();
    },[dispatch])

    return(
        <Routes>
            <Route index element={<CategoriesPreview />}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
        
    )
}

export default Shop;