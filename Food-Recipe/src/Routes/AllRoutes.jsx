import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import SingleFood from "../Components/SingleFood";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Profile from "../Components/Profile";


const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/recipe/:id" element={<SingleFood />} />
			<Route path="/profile" element={<Profile />} />
		</Routes>
	)
}

export default AllRoutes;