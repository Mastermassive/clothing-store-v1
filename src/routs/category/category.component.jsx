import { useParams } from "react-router-dom";

import {CategoryTitle, CategoryContainer} from "./category.styles";

import { Fragment, useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const Category = () => {
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const categoriesMap = useSelector(selectCategoriesMap);
    

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap]);

    return(
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {   products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </CategoryContainer>
        </Fragment>
        
    )
}

export default Category;