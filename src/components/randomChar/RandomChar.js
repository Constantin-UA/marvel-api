import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';

import { Component } from 'react';
import Spinner from '../spinner/Spinner.js';
import ErrorMessage from '../errorMessage/ErrorMessage.js';
import MarvelService from '../../services/MarvelService.js';

class RandomChar extends Component {
	state = {
		char: {},
		loading: true,
		error: false,
	};

	MarvelService = new MarvelService();

	componentDidMount() {
		this.updateChar();
		//this.timerId = setInterval(this.updateChar, 15000);
	}

	onCharLoaded = (char) => {
		this.setState({
			char,
			loading: false,
		});
	};

	onCharLoading = () => {
		this.setState({
			loading: true,
		});
	};

	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.onCharLoading();
		this.MarvelService.getCharacter(id).then(this.onCharLoaded).catch(this.onError);
	};

	onError = () => {
		this.setState({
			loading: false,
			error: true,
		});
	};

	componentWillUnmount() {
		//clearInterval(this.timerId);
	}

	render() {
		const { char, loading, error } = this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <View char={char} /> : null;
		return (
			<div className="randomchar">
				{errorMessage}
				{spinner}
				{content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!
						<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">Or choose another one</p>
					<button onClick={this.updateChar} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		);
	}
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, imgNotAvailable } = char;
	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt={name} className="randomchar__img" style={imgNotAvailable} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};
export default RandomChar;
