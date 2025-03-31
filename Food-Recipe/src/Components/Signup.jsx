import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../App";

const Signup = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			const res = await axios.post(`${SERVER}/reg`, { name, email, password });
			console.log(res);

			if (res.status === 200) {
				setMessage("Signup successful! Redirecting to login...");
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			}
		} catch (error) {
			setMessage("Signup failed. Please try again.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-md"
				style={{ padding: "50px 20px" }}
			>
				<h2 className="text-2xl font-bold text-center text-gray-800" style={{ marginBottom: "20px" }}>Create an Account</h2>

				{message && <p className="text-center text-sm text-blue-600">{message}</p>}

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					
					<div>
						<label className="block font-medium text-gray-800 text-md">Name</label>
						<input
							type="text"
							value={name}
							placeholder="Enter your name"
							onChange={(e) => setName(e.target.value)}
							className="text-black w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							style={{ padding: "8px 12px" }}
							required
						/>
					</div>

					{/* Email Input */}
					<div>
						<label className="block font-medium text-gray-800 text-md">Email</label>
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

					{/* Password Input */}
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
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
						disabled={loading}
						style={{ padding: "10px" }}
					>
						{loading ? "Signing up..." : "Sign Up"}
					</button>
				</form>

				<p className="text-center text-gray-600"
					style={{ marginTop: "20px" }}
				>
					Already have an account?{" "}
					<a href="/login" className="text-blue-500 hover:underline">Login</a>
				</p>
			</div>
		</div>
	);
};

export default Signup;
