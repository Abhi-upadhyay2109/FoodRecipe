import { useContext, useState } from "react";
import axios from "axios";
import { ContextProvider } from "../Context/ContextAPI";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../App";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { setToken, setUser, setIsAuth } = useContext(ContextProvider);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			const res = await axios.post(`${SERVER}/login`, { email, password });
			console.log(res);

			if (res.status === 200) {
				setUser(res.data.user);
				setToken(res.data.token);
				setIsAuth(true);
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("user", JSON.stringify(res.data.user));

				setMessage("Login successful! Redirecting...");
				setTimeout(() => {
					navigate("/");
				}, 2000);
			}
		} catch (error) {
			setMessage("Invalid credentials. Please try again.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
				style={{ padding: "50px 20px" }}
			>
				<h2 className="text-2xl font-bold text-center text-gray-800"
					style={{ marginBottom: "10px" }}
				>Login to Your Account</h2>
				{message && <p className="text-center text-sm text-red-600">{message}</p>}

				<form onSubmit={handleSubmit} className="flex flex-col gap-8">
					<div>
						<label className="block font-medium text-gray-800 text-md">Email:</label>
						<input
							type="email"
							value={email}
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
							className="text-black w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							style={{ padding: "8px 12px" }}
							required
						/>
					</div>

					<div>
						<label className="block font-medium text-gray-800 text-md">Password</label>
						<input
							type="password"
							value={password}
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
							className="text-black w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							style={{ padding: "8px 12px" }}
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
						style={{ padding: "10px", marginBottom: "8px" }}
						disabled={loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<p className="text-center mt-4 text-gray-600">
					Don't have an account?{" "}
					<a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
				</p>
			</div>
		</div>
	);
};

export default Login;
