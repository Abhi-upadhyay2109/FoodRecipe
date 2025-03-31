import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../Context/ContextAPI";

const Navbar = () => {
	const navigate = useNavigate();
	const { isAuth, setToken, user, setIsAuth } = useContext(ContextProvider);
	return (
		<nav
			className="bg-white w-full fixed top-0 left-0 right-0 z-50"
			style={{ padding: "10px 20px", boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
		>
			<div
				className="container mx-auto flex justify-between items-center"
				style={{ padding: "10px 0px" }}
			>
				<Link
					to="/"
					className="text-2xl flex items-center gap-2 font-bold text-black transition"
				>
					<img src="/logo.png" alt="logo" className="w-12" />
					<p>Food Recipe</p>
				</Link>

				<ul className="flex items-center gap-2">
					{!isAuth ? (
						<>
							<li>
								<Link
									to="/login"
									className="flex items-center gap-2 bg-blue-700 text-white font-bold uppercase rounded-sm"
									style={{ padding: "6px 12px" }}
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									to="/signup"
									className="flex items-center gap-2 bg-blue-700 text-white font-bold uppercase rounded-sm"
									style={{ padding: "6px 12px" }}
								>
									Signup
								</Link>
							</li>
						</>
					) : (
						<div className="flex items-center gap-2">
							<div
								className="flex items-center gap-2 bg-blue-700 text-white font-bold uppercase rounded-sm"
								style={{ padding: "5px 12px" }}
								onClick={() => navigate("/profile")}
							>
								{user && (
									<span className="bg-blue-500 text-white font-bold flex items-center justify-center rounded-full"
										style={{ padding: "5px 12px" }}
									>
										{user.name?.charAt(0).toUpperCase()}
									</span>
								)}
								{user && (
									<span className="hidden md:block text-sm font-bold">
										{user.name}
									</span>
								)}
							</div>

							<button
								onClick={() => {
									localStorage.clear();
									setIsAuth(false);
									setToken("");
									window.location.reload();
									navigate("/login");
								}}
								className="text-white font-bold bg-red-500 hover:bg-red-600 rounded-sm transition"
								style={{ padding: "10px 16px" }}
							>
								Logout
							</button>
						</div>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
