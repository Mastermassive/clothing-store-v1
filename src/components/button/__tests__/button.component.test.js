import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../button.component";
import { BUTTON_TYPE_CLASSES } from "../button.component";


describe("Button Tests", () => {
    test("Base button should render when nothing is passed", () => {
        render(<Button />);

        const ButtonElement = screen.getByRole('button');
        userEvent.unhover(ButtonElement);
        expect(ButtonElement).toHaveStyle("background-color: white");
    });

    test("Google button should render when google button type is passed", () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

        const ButtonElement = screen.getByRole('button');
        expect(ButtonElement).toHaveStyle("background-color: #357ae8");
    });

    test("Inverted button should render when inverted button type is passed", () => {
        render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

        const ButtonElement = screen.getByRole('button');
        expect(ButtonElement).toHaveStyle("background-color: black");
    });

    test("Is Button Disabled", () => {
        render(<Button isLoading={true} />);

        const ButtonElement = screen.getByRole('button');
        expect(ButtonElement).toBeDisabled();
    });
});