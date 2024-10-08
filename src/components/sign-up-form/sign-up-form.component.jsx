import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import  {SignUpContainer} from "./sign-up-form.styles";
import { createAuthUserWithEmailAndPassword , getUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";


const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

const SignUpForm = () => {
    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;              
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        console.log(event);
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("PASSWORDS DO NOT MATCH");
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await getUserDocumentFromAuth(user, {displayName})
            resetFormFields();

        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                alert("EMAIL ALREADY IN USE");
            }
            console.log(error);
        }
    }

    const handleChange = (event) => {
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