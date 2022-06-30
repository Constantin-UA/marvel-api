import { Component } from 'react';
import Spinner from '../spinner/Spinner.js';
import ErrorMessage from '../errorMessage/ErrorMessage.js';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService.js';
import './charInfo.scss';

class CharInfo extends Component {
	state = {
		char: null,
		loading: false,
		error: false,
	};
	MarvelService = new MarvelService();
	componentDidMount() {
		this.onInfoUpdate();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.charId !== prevProps.charId) {
			this.onInfoUpdate();
		}
	}

	onInfoUpdate = () => {
		const { charId } = this.props;
		if (!charId) {
			return;
		}
		this.onInfoLoading();
		this.MarvelService.getCharacter(charId).then(this.onInfoLoaded).catch(this.onError);
	};

	onInfoLoading = () => {
		this.setState({ loading: true });
	};

	onError = () => {
		this.setState({ error: true, loading: false });
	};

	onInfoLoaded = (char) => {
		this.setState({ char, loading: false });
	};

	render() {
		const { char, loading, error } = this.state;

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
	}
}

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
export default CharInfo;
