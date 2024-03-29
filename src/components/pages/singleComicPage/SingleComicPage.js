import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Spinner from '../../spinner/Spinner.js';
import ErrorMessage from '../../errorMessage/ErrorMessage.js';
import useMarvelService from '../../../services/MarvelService';

import './singleComicPage.scss';

const SingleComicPage = () => {
	const { comicId } = useParams();
	const [comic, setComic] = useState(null);
	const { loading, error, clearError, getComic } = useMarvelService();

	useEffect(() => {
		updateComic();
	}, [comicId]);

	const updateComic = () => {
		clearError();
		getComic(comicId).then(onComicLoaded);
	};
	const onComicLoaded = (comic) => {
		setComic(comic);
	};
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comic) ? <View comic={comic} /> : null;
	return (
		<>
			{spinner}
			{errorMessage}
			{content}
		</>
	);
};

const View = ({ comic }) => {
	const { thumbnail, title, price, pageCount, language, description } = comic;
	return (
		<div className="single-comic">
			<img src={thumbnail} alt="x-men" className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount.slice(0, -1)}ages</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}$</div>
			</div>
			<NavLink to={'/comics'} className="single-comic__back">
				Back to all
			</NavLink>
		</div>
	);
};
export default SingleComicPage;
