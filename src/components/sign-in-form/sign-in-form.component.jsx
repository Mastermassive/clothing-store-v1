import { useState } from "react"
import FormInput from "../form-input/form-input.component";
import {SignInContainer, ButtonContainer} from "./sign-in-form.styles";
import { 
    signInUserWithEmailAndPassword, 
    signInWithGooglePopup, 
    getUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";


const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;


    const signInWithGoogle = async () => {
        try {
            const {user} = await signInWithGooglePopup();
            await getUserDocumentFromAuth(user);
        } catch(err) {
            console.log("error occurred");
        }
        
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

        try{
            const {user} = await signInUserWithEmailAndPassword(email, password);
            console.log(user);
            resetFormFields();
        }catch(error){
            if(error.code==="auth/invalid-credential"){
                alert("wrong username or password");
            }
            console.log(error);
        }
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