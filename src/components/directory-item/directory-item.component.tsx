import {BackgroundImage, DirectoryItemContainer, Body} from './directory-item.styles';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import {useNavigate} from "react-router-dom";
import { FC } from 'react';

type DirectoryItemProps = {
  category: {
    id: number;
    title: string;
    imageUrl: string;
    route: string;
  }
}

const DirectoryItem: FC<DirectoryItemProps> = ({category}) => {
    const {title, imageUrl, route} = category;
    const navigate = useNavigate();
    const navigateHandler = () => {
      navigate(route);
    }
    return(
        <DirectoryItemContainer onClick={navigateHandler}>
          <StyleSheetManager shouldForwardProp={isPropValid}>
            <BackgroundImage 
              imageUrl= {imageUrl}
            />
          </StyleSheetManager> 
            <Body>
              <h2>{title}</h2>
              <p>Shop Now</p>
            </Body>
          </DirectoryItemContainer>
    )
}

export default DirectoryItem;