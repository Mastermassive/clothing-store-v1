import {FormInputLabel, Input, Group} from './form-input.styles';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { FC, InputHTMLAttributes } from 'react';

type FormInputProps = {label: string} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({label,...otherProps}) => {
    return(
        <Group>
            <Input {...otherProps} />
            {label && ( 
            <StyleSheetManager shouldForwardProp={isPropValid}>
                <FormInputLabel 
                    shrink={Boolean(
                        otherProps.value &&
                        typeof otherProps.value === "string" &&
                        otherProps.value.length
                    )} 
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


