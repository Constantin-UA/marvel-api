import apiKey from '../apiKey.js';

class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_baseOffset = 210;

	getResourse = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${url.status}`);
		}

		return await res.json();
	};

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResourse(
			`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${apiKey.key}`
		);
		return res.data.results.map(this._transformCharacter);
	};
	getCharacter = async (id) => {
		const res = await this.getResourse(`${this._apiBase}characters/${id}?apikey=${apiKey.key}`);
		return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description:
				char.description !== ''
					? `${char.description.slice(0, 210)}...`
					: 'Sorry, no description found for this character.',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepageUlr: char.urls[0].url,
			wikiUlr: char.urls[1].url,
			imgNotAvailable:
				char.thumbnail.path === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'
					? { objectFit: 'unset' }
					: { objectFit: 'cover' },
			comics: char.comics.items.slice(0, 10),
		};
	};
}

export default MarvelService;
