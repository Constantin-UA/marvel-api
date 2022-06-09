import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import './randomChar.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService.js';
class RandomChar extends Component {
	constructor(props) {
		super(props);
		this.updateChar();
	}
	state = {
		char: {},
	};

	MarvelService = new MarvelService();
	onCharLoaded = (char) => {
		this.setState({ char });
	};
	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.MarvelService.getCharacter(id).then(this.onCharLoaded);
	};

	render() {
		const {
			char: { name, descr, thumbnail, homepageUlr, wikiUlr },
		} = this.state;
		return (
			<div className="randomchar">
				<div className="randomchar__block">
					<img src={thumbnail} alt="Random character" className="randomchar__img" />
					<div className="randomchar__info">
						<p className="randomchar__name">{name}</p>
						<p className="randomchar__descr">{descr}</p>
						<div className="randomchar__btns">
							<a href={homepageUlr} className="button button__main">
								<div className="inner">homepage</div>
							</a>
							<a href={wikiUlr} className="button button__secondary">
								<div className="inner">Wiki</div>
							</a>
						</div>
					</div>
				</div>
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!
						<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">Or choose another one</p>
					<button className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		);
	}
}
export default RandomChar;
