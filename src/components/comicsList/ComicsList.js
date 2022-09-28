import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { loading, error, getAllComics } = useMarvelService();
	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;
		if (newComicsList.length < 8) {
			ended = true;
		}

		setComicsList([...comicsList, ...newComicsList]);
		setNewItemLoading(false);
		setOffset((offset) => offset + 8);
		setComicsEnded(ended);
	};

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = { objectFit: 'cover' };
			if (
				item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
			) {
				imgStyle = { objectFit: 'unset' };
			}

			return (
				<li key={nextId()} className="comics__item">
					<NavLink to={`/comics/${item.id}`}>
						<img
							src={item.thumbnail}
							alt={item.title}
							className="comics__item-img"
							style={imgStyle}
						/>
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price}$</div>
					</NavLink>
				</li>
			);
		});
		return <ul className="comics__grid">{items}</ul>;
	}

	const items = renderItems(comicsList);
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;
	return (
		<div className="comics__list" id="comics">
			{errorMessage}
			{spinner}
			{items}
			<button
				style={{ display: comicsEnded ? 'none' : 'block' }}
				disabled={newItemLoading}
				className="button button__main button__long"
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};
export default ComicsList;
