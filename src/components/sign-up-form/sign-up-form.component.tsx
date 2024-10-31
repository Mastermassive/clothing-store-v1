import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../form-input/form-input.component";
import  {SignUpContainer} from "./sign-up-form.styles";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";


const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;              
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        console.log(event);
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("PASSWORDS DO NOT MATCH");
            return;
        }
        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields();

        } catch(error) {
            if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert("EMAIL ALREADY IN USE");
            }
            console.log(error);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({ ...formFields, [name]:value });
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Display Name" 
                    type="text" 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                    required 
                />

                <FormInput 
                    label="Email" 
                    type="email" 
                    onChange={handleChange} 
                    name="email"
                    value={email} 
                    required 
                />

                <FormInput 
                    label="Password" 
                    type="password" 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    required 
                />

                <FormInput
                    label="Confirm Password"  
                    type="password" 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    required    
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;