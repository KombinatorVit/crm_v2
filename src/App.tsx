import "./App.css";
import AuthComponent from "./components/AuthComponent";
import store from "./store";
import {Provider} from "react-redux";

function App() {

    return (
        <>
            <Provider store={store}>
                <AuthComponent/>
            </Provider>
        </>
    );
}

export default App;
