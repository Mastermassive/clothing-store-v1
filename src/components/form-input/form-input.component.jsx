import {FormInputLabel, Input, Group} from './form-input.styles.jsx';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';


const FormInput = ({label,...otherProps}) => {
    return(
        <Group>
            <Input {...otherProps} />
            {label && ( 
            <StyleSheetManager shouldForwardProp={isPropValid}>
                <FormInputLabel 
                    shrink={otherProps.value.length} 
                >
                    {label}
                </FormInputLabel>
            </StyleSheetManager>)}
        </Group>
    )
}

export default FormInput;

// import { FormInputLabel, Input, Group } from './form-input.styles';

// const FormInput = ({ label, ...otherProps }) => {
//   return (
//     <Group>
//       <Input {...otherProps} />
//       {label && (
//         <FormInputLabel shrink={otherProps.value.length}>
//           {label}
//         </FormInputLabel>
//       )}
//     </Group>
//   );
// };

// export default FormInput;


