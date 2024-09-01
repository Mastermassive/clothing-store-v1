import { 
    signInWithGooglePopup, getUserDocumentFromAuth
 } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopup();
            console.log(response);
            getUserDocumentFromAuth(response.user);
        } catch(err) {
            console.log("error occurred");
        }
        
    }
    return (
        <div>
            <h1>Sign In page</h1>
            <Button buttonType="google" onClick={logGoogleUser}>Sign In With Google</Button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;