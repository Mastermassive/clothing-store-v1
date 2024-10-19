import { useState} from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import {SignInContainer, ButtonContainer} from "./sign-in-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";


const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;


    const signInWithGoogle = async () => {
       dispatch(googleSignInStart()); 
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]:value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(emailSignInStart(email, password));
        resetFormFields();
    }


    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label='Email' 
                    type='email' 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                    required
                />

                <FormInput 
                    label='Password' 
                    type='password' 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                    required
                />

                <ButtonContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google Sign In
                    </Button>
                </ButtonContainer>  
            </form>
            
        </SignInContainer>
        
    )
}

export default SignInForm;