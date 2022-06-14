import apiKey from '../apiKey.js';

class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';

	getResourse = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${url.status}`);
		}

		return await res.json();
	};

	getAllCharacters = async () => {
		const res = await this.getResourse(
			`${this._apiBase}characters?limit=9&offset=210&apikey=${apiKey.key}`
		);
		return res.data.results.map(this._transformCharacter);
	};
	getCharacter = async (id) => {
		const res = await this.getResourse(`${this._apiBase}characters/${id}?apikey=${apiKey.key}`);
		return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = (char) => {
		return {
			name: char.name,
			description:
				char.description !== ''
					? char.description
					: 'Sorry, no descriptions found for this character.',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepageUlr: char.urls[0].url,
			wikiUlr: char.urls[1].url,
		};
	};
}

export default MarvelService;
