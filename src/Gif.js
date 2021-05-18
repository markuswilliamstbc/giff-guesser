import React, { useEffect, useState } from "react";
import axios from "axios";
import randomWord from "./randomWord";
let ranWord = randomWord();

function refreshPage() {
	window.location.reload(false);
}

export default function Gif() {
	const [data, setData] = useState(null);
	const [guess, setGuess] = useState("");
	const [word, setWord] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	let letterCount = ranWord.replace(/\s+/g, "").length;
	let blankCount = "";
	for (let i = 0; i < letterCount; i++) {
		blankCount += "_ ";
	}
	useEffect(() => {
		axios(
			`https://api.giphy.com/v1/gifs/search?api_key=e3VSkYg6dHt7sY4o1us0anHs6KwmtARe&q=${ranWord}&limit=1&offset=0&rating=g&lang=en`
		)
			.then((response) => {
				setData(response.data);
				setWord(ranWord);
				setGuess(blankCount);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
				setError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);
	if (loading) return <div className="gif-loading"></div>;
	if (error) return "Error!";

	return (
		<div>
			<img
				src={data.data[0].images.fixed_height.url}
				alt="random gif"
				className="gif"
			/>
			<h1 className="guess">{guess}</h1>
			<h1 className="answer">{word}</h1>
			<button onClick={refreshPage} className="btn">
				Search new gif
			</button>
		</div>
	);
}
