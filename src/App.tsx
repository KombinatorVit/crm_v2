import {Route, Routes} from "react-router-dom";
import PrivateRouter from "./utils/router/PrivateRouter";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";


function App() {
    const telegramApiToken = import.meta.env.VITE_TELEGRAM_API_TOKEN;
    console.log(telegramApiToken);




    return (
        <Routes>
            <Route element={<PrivateRouter/>}>
                <Route path={"/"} element={<HomePage/>}/>
            </Route>
            <Route path={"login"} element={<LoginPage/>}/>
        </Routes>
    )
        ;
}

export default App;
