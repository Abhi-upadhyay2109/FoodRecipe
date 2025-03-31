import { useContext } from "react";
import Navbar from "./Components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import { ContextProvider } from "./Context/ContextAPI";

// export const SERVER = "http://localhost:3000"
export const SERVER = "https://foodrecipes-backend.onrender.com"
// export const API = "b62222adb6df497bbfdfb33ee7310462"
// export const API = "092e26df7455448eb75c97c2cafea446"
// export const API = "5cddfd9396e348f5b7f35012fed9c403"
// export const API = "db3aa8586f3a47158b3b7c0da68bb45f"
export const API = "75f324955bb24dd3b33beb91fe193cd5"



const App = () => {

	const { popup, message, error } = useContext(ContextProvider);

	return (
		<>
			<div>
				<Navbar />
				<AllRoutes />
			</div>

			{
				popup &&
				(
					<div className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-50">
						<div
							className={`transform transition-transform duration-300 ease-in-out ${popup ? 'translate-y-0' : 'translate-y-full'
								} ${message ? "bg-green-300" : error ? "bg-red-300" : "bg-white"} p-6 shadow-lg rounded-t-lg w-full max-w-md sm:max-w-lg`}
							style={{ padding: "10px 20px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
						>
							{message && (
								<div className="w-fit mt-4 bg-green-300 rounded-sm text-black px-3 py-1">
									<p className="text-center">{message}</p>
								</div>
							)}
							{error && (
								<div className="w-fit mt-4 bg-red-300 rounded-sm text-black px-3 py-1">
									<p className="text-center">{error}</p>
								</div>
							)}
						</div>
					</div>
				)
			}
		</>
	)
}

export default App;