import ProductCard from "../product-card/product-card.component";
import {CategoryPreviewContainer, TitleLink, Preview} from "./category-preview.styles.jsx";

const CategoryPreview = ({title, products}) => {
    return(
            <CategoryPreviewContainer>
            <h2>
                <TitleLink to={`/shop/${title}`}>
                    {title.toUpperCase()}
                </TitleLink>
            </h2>
            <Preview>
                {
                    products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
    
}

export default CategoryPreview;