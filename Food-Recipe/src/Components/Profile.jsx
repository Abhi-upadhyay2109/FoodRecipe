import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../Context/ContextAPI";
import axios from "axios";
import { SERVER } from "../App";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Profile = () => {
	const { token } = useContext(ContextProvider);
	const [data, setData] = useState(null);
	const fetchProfile = async () => {
		try {
			const res = await axios.get(`${SERVER}/profile`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setData(res.data);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const removeFavItems = async (foodId) => {
		try {
			const res = await axios.delete(`${SERVER}/fav/${foodId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			fetchProfile()
			console.log(res);
		} catch (error) {
			console.log(error);

		}
	}

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<div className="border max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-8"
			style={{ margin: "100px auto" }}
		>
			<div className="bg-white shadow-xl rounded-lg p-6 text-center border border-gray-200">
				<img
					src={data?.user?.image || "https://tinyurl.com/9edxm3tb"}
					alt="Profile"
					className="w-32 h-32 mx-auto rounded-full border-4 border-gray-300"
				/>
				<h2 className="text-2xl font-bold mt-4 uppercase">{data?.user?.name}</h2>
				<p className="text-gray-600">{data?.user?.email}</p>
				<p className="text-gray-500 mt-2">{data?.user?.location || "Location Not Provided"}</p>

				<h3 className="text-lg font-semibold mt-6">Certifications</h3>
				<ul className="text-gray-700">
					{data?.user?.certifications?.map((cert, index) => (
						<li key={index} className="mt-1">
							{cert}
						</li>
					))}
				</ul>
			</div>

			<div className="md:col-span-2">
				<h3 className="text-3xl font-semibold text-gray-800">Favorite Foods</h3>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
					{data?.allFav?.items?.map((recipe) => (
						<div key={recipe.id} className="relative group rounded-lg overflow-hidden shadow-lg bg-white transform hover:scale-105 transition duration-300">
							<Link to={`/recipe/${recipe?.foodId}`} className="block">
								<img
									src={recipe.image || "https://tinyurl.com/458yz4wy"}
									alt={recipe.title}
									className="w-full h-48 object-cover rounded-t-lg"
								/>
								<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-75 transition duration-300"></div>
								<h2 className="absolute bottom-4 left-4 text-xl font-bold text-white drop-shadow-lg">
									{recipe.title}
								</h2>
							</Link>
							<button className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded flex items-center gap-1"
								style={{ padding: "6px" }}
								onClick={() => removeFavItems(recipe?.foodId)}
							><MdDelete />Delete</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Profile;
