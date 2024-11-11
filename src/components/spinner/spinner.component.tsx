import { SpinnerOverlay, SpinnerContainer } from "./spinner.styles";

const Spinner = () => {
    return(
        <SpinnerOverlay data-testid="s">
            <SpinnerContainer/>
        </SpinnerOverlay>
    )
}

export default Spinner;