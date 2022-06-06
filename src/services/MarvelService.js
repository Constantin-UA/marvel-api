import apiKey from '../apiKey.js';

class MarvelService {
	getResourse = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${url.status}`);
		}

		return await res.json();
	};

	getAllCharacters = () => {
		return this.getResourse(
			`https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey.key}`
		);
	};
}

export default MarvelService;
