import { render } from "@testing-library/react";
import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "../../store/root-reducer";
import { Provider } from "react-redux";


export function renderWithProviders (
    ui,
    {
        preloadedState={},
        store= createStore(rootReducer, preloadedState),
        ...renderOptions
    } = {}
) {
    const Wrapper = ({children}) => (
        <Provider store={store}>
            {children}
        </Provider>
    )

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}