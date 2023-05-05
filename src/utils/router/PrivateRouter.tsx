import {Navigate, Outlet} from "react-router-dom";


const PrivateRouter = () => {
    const auth = true;



    return (
        <div>
            {auth ? <Outlet/> : <Navigate to={"login"}/>
            }        </div>
    );
};

export default PrivateRouter;