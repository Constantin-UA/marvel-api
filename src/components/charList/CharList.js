import './charList.scss';

import { Component } from 'react';
import MarvelService from '../../services/MarvelService.js';
class CharList extends Component {
	state = {
		chars: {},
	};
	MarvelService = new MarvelService();

	onCharsLoaded = (chars) => {
		this.setState({ chars });
	};

	loadChars = () => {
		this.MarvelService.getAllCharacters().then(this.onCharsLoaded);
	};

	componentDidMount = () => {
		console.log('Mount');
		this.loadChars();
	};

	render() {
		console.log('render');
		const { chars } = this.state;
		const content = Array.from(chars).map((char, idx) => <View char={char} key={idx} />);
		return (
			<div className="char__list">
				<ul className="char__grid">{content}</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

const View = ({ char }) => {
	if (char) {
		const { thumbnail, name, imgNotAvailable } = char;
		let imgClass = imgNotAvailable ? 'char__item_img_not' : 'char__item_img';
		return (
			<li className="char__item">
				<img src={thumbnail} alt="abyss" className={imgClass} />
				<div className="char__name">{name}</div>
			</li>
		);
	}
};
export default CharList;
