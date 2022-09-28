import apiKey from '../apiKey.js';
import { useHttp } from '../hooks/http.hook';
const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&apikey=${apiKey.key}`
		);
		return res.data.results.map(_transformCharacter);
	};
	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?apikey=${apiKey.key}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${apiKey.key}`
		);
		return res.data.results.map(_transformComics);
	};
	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?apikey=${apiKey.key}`);
		return _transformComics(res.data.results[0]);
	};

	const _transformCharacter = (char) => {
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

	const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || 'There is no description',
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: 'No information about the number of pages',
			thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
			language: comics.textObjects.language || 'en-us',
			price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
		};
	};

	return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic };
};

export default useMarvelService;
