import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner.js';
import ErrorMessage from '../errorMessage/ErrorMessage.js';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService.js';
import './charInfo.scss';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		onInfoUpdate();
	}, [props.charId]);

	const onInfoUpdate = () => {
		const { charId } = props;
		if (!charId) {
			return;
		}
		clearError();
		getCharacter(charId).then(onInfoLoaded);
	};

	const onInfoLoaded = (char) => {
		setChar(char);
	};

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;
	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepageUlr, wikiUlr, comics, imgNotAvailable } = char;

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgNotAvailable} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepageUlr} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wikiUlr} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : `There is no comics with ${name}.`}
				{comics.map((item, i) => {
					return (
						<li className="char__comics-item" key={i}>
							{item.name}
						</li>
					);
				})}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charId: PropTypes.number,
};
export default CharInfo;
