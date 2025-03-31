import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER } from "../App";
import { FaClock, FaPeopleGroup, FaStar } from "react-icons/fa6";
import { ContextProvider } from "../Context/ContextAPI";
import { CiSearch } from "react-icons/ci";
import { GiChickenOven } from "react-icons/gi";
import { AiFillHeart } from "react-icons/ai";
import { FoodType } from "../assets/data";

const Home = () => {
	const { isAuth, addFav } = useContext(ContextProvider);
	const [recipes, setRecipes] = useState([]);
	const [cuisines, setCuisines] = useState("");
	const [type, setType] = useState("");

	const [limit, setLimit] = useState(20);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState("")

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`${SERVER}/foods?query=${query}&cuisine=${cuisines}&number=${limit}&type=${type}&addRecipeInformation=true`);
			setRecipes(res.data)
			console.log(res.data)
			setIsLoading(false);
		} catch (error) {
			setError(error.response.data.message);
			setIsLoading(false);
		}
	}
	useEffect(() => {
		const timer = setTimeout(() => {
			fetchData();
		}, 2000);
		return () => clearTimeout(timer);
	}, [query, cuisines, limit, type])


	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-red-500">Error: {error.message}</p>
			</div>
		);
	}
	return (
		<div className="flex h-screen justify-start items-center flex-col"
			style={{ padding: "10px 5px", marginTop: "90px" }}
		>
			<div className="flex justify-between items-center gap-8">
				<div className="border rounded-full flex items-center"
					style={{ padding: "6px 12px" }}
				>
					<input type="text" placeholder="Search food..." onChange={(e) => setQuery(e.target.value)} className="outline-none" />
					<button className="text-2xl"><CiSearch /></button>
				</div>

				<select
					name="cuisine"
					className="w-full max-w-xs px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition duration-300"
					style={{ padding: "8px 12px" }}
					onChange={(e) => setCuisines(e.target.value)}
				>
					<option value="all">All</option>
					<option value="Indian">Indian</option>
					<option value="German">German</option>
					<option value="Italian">Italian</option>
					<option value="Chinese">Chinese</option>
					<option value="American">American</option>
					<option value="Mexican">Mexican</option>
					<option value="Japanese">Japanese</option>
					<option value="Korean">Korean</option>
					<option value="Thai">Thai</option>
				</select>

			</div>

			<div className="flex gap-4 flex-wrap md:flex-nowrap justify-center items-center"
				style={{ marginTop: "20px" }}
			>
				{FoodType?.map((item) => {
					return (
						<div key={item.id} className="cursor-pointer hover:bg-gray-200 rounded-md w-[70px] h-[70px] md:w-[110px] md:h-[110px] flex flex-col gap-2 justify-center items-center"
							style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px", padding: "8px 12px" }}
							onClick={() => setType(item?.type)}
						>
							<img src={item?.poster} className="w-10 md:w-16" alt="" />
							<p className="text-xs md:text-sm capitalize rowdies-regular">{item?.type}</p>
						</div>
					)
				})}
			</div>
			<div className="w-full flex flex-col md:flex-row justify-between items-center gap-8"
				style={{ marginTop: "20px" }}
			>
				<div className="flex items-center gap-2">
					<div className="bg-red-500 w-1 h-8"></div>
					<h1 className="text-3xl rowdies-regular">Find Your Favorite Food</h1>
				</div>
				<select name="" id="" onChange={(e) => setLimit(Number(e.target.value))}
					className="hidden md:flex w-full max-w-xs px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none hover:border-blue-400 transition duration-300"
					style={{ padding: "8px 12px" }}
				>
					<option value="20">20</option>
					<option value="40">40</option>
					<option value="60">60</option>
				</select>
			</div>
			{isLoading ? <div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
			</div> : (
				<div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
					style={{ padding: "10px 5px", marginTop: "20px" }}
				>
					{recipes &&
						recipes.map((recipe) => {
							return (
								<div key={recipe.id} className="relative">
									<Link to={`/recipe/${recipe.id}`}>
										<img src={recipe.image} alt={recipe.title} className="w-full h-80 object-cover rounded-lg"
											style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}
										/>
										<div className="flex flex-col gap-2"
											style={{ marginTop: "10px" }}
										>
											<p className="exo capitalize font-bold text-red-500">{recipe?.cuisines[0] || "Indian"}</p>
											<h2 className="text-xl font-bold mt-2 saira hover:text-red-500">{recipe.title}</h2>
											<p className="text-gray-600">{recipe.cuisines}</p>
										</div>
									</Link>
									<div className="flex justify-between items-center saira">
										<p className="flex justify-center items-center gap-1 capitalize hover:text-red-500"><FaClock /> {recipe.readyInMinutes} min.</p>
										<p className="flex justify-center items-center gap-1 capitalize hover:text-red-500"><GiChickenOven /> {recipe.vegetarian ? "Veg" : "Non-veg"} Food</p>
										<p className="flex justify-center items-center gap-1 capitalize hover:text-red-500"><FaPeopleGroup /> {recipe.servings} serves</p>
									</div>
									{isAuth &&
										<div className="w-full absolute top-2 flex justify-between items-center"
											style={{ padding: "6px" }}
										>
											<button className="bg-yellow-500 text-white p-2 rounded-full flex items-center gap-1" style={{ padding: "6px" }} title="Rate"><FaStar /> 4.8</button>

											<button className="cursor-pointer bg-red-500 text-white p-2 rounded-full" style={{ padding: "6px" }} onClick={() => addFav({ foodId: recipe.id, title: recipe.title, image: recipe.image })}><AiFillHeart size={30} /></button>
										</div>}
								</div>
							);
						})}
				</div>
			)}
		</div>

	)
}


export default Home