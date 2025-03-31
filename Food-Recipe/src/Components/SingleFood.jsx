import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { GiChickenOven } from "react-icons/gi";
import { MdPeople } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { ContextProvider } from "../Context/ContextAPI";
import { API } from "../App";


const SingleFood = () => {
	const { isAuth, addFav } = useContext(ContextProvider);
	const [changeView, setChangeView] = useState("grid");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("")
	const { id } = useParams();
	const [food, setFood] = useState(null);
	const getSingleFood = async () => {
		setIsLoading(true)
		try {
			const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API}`);
			setFood(res.data);
			setIsLoading(false)
		} catch (error) {
			console.log(error);
			setError(error.message)
			setIsLoading(false)
		}
	}
	useEffect(() => {
		getSingleFood();
	}, [])


	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-2xl font-bold text-red-500">Error: {error}</p>
			</div>
		)
	}

	return (
		<>
			{isLoading ? <div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-500"></div>
			</div> :

				<div className="flex flex-col gap-4"
					style={{ marginTop: "100px", padding: "10px 20px" }}
				>
					<div className="flex flex-col md:flex-row justify-between"
						style={{ marginTop: "10px" }}
					>
						<p className="font-bold text-2xl">{food?.title}</p>
						{isAuth && <button className="w-fit bg-red-500 text-white font-bold flex items-center gap-4 rounded-md"
							style={{ padding: "5px 10px" }}

							onClick={() => {
								addFav({ foodId: food?.id, title: food?.title, image: food?.image })
							}}><FaBookmark /> Faveorites</button>}
					</div>
					<img src={food?.image} className="w-full md:w-1/2" alt="food.title" />
					<div className="flex justify-start items-center gap-2">
						<p className="border rounded-md flex gap-2 items-center text-xs md:text-md"
							style={{ padding: "5px 10px" }}><MdPeople size={20} /> Servings: ${food?.pricePerServing}</p>
						<p className="border rounded-md flex gap-2 items-center text-xs md:text-md"
							style={{ padding: "5px 10px" }}
						><FaClock size={20} />Ready in {food?.readyInMinutes} Minutes</p>
						<p className="border rounded-md flex gap-2 items-center text-xs md:text-md"
							style={{ padding: "5px 10px" }}> <GiChickenOven size={20} />Vegiterian: {food?.vegiterian ? "Yes" : "No"}</p>
					</div>
					<div className="flex flex-col gap-4">
						<p className="font-bold text-2xl">Ingredients</p>
						<div className="flex justify-between md:justify-start gap-8">
							<div className="flex">
								<button className={`${changeView === "grid" ? "bg-blue-500" : "bg-gray-500"} capitalize`}
									style={{ padding: "5px 10px" }}
									onClick={() => setChangeView("grid")}
								>
									grid
								</button>
								<button className={`${changeView === "grid" ? "bg-gray-500" : "bg-blue-500"} capitalize`}
									onClick={() => setChangeView("list")}
									style={{ padding: "5px 10px" }}
								>list</button>
							</div>
							<div>servings: <input type="number" placeholder="1"
								className="border rounded-md p-2 w-12 text-center"
							/> </div>
						</div>
						<div className={`${changeView === "grid" ? "flex" : "block w-full"} gap-4 flex-wrap`}>
							{food?.extendedIngredients.map((ingredient, index) => {
								return (
									<div key={index} className={`rounded-md flex ${changeView === "grid" ? "flex-col" : "gap-8"} items-center border`}
										style={{ padding: "5px", width: changeView === "grid" ? "150px" : "100%", height: "120px", marginBottom: changeView === "list" && "10px" }}>
										<p className={`${changeView === "list" ? "hidden" : ""} capitalize text-xs`}>{ingredient.amount} <span className="text-xs capitalize">{ingredient.unit}</span></p>
										<img src="https://tinyurl.com/2xzz98y4" alt="" className="h-18" />
										<div>
											<p className={`${changeView === "list" ? "" : "hidden"} capitalize text-xs`}>{ingredient.amount} <span className="text-xs capitalize">{ingredient.unit}</span></p>
											<p className="capitalize text-xs">{ingredient.nameClean}</p>
										</div>
									</div>
								)
							})}
						</div>
					</div>
					<div>
						<p className="font-bold text-2xl">Instructions</p>
						<p>{food?.instructions}</p>
					</div>
				</div>
			}
		</>
	)
}

export default SingleFood