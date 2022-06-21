import abyss from '../../resources/img/abyss.jpg';
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
		this.loadChars();
		console.log('Mount');
	};

	onLoadChar(chars) {
		const char = chars[0];
		return <View char={char} />;
	}

	render() {
		const { chars } = this.state;
		const content = this.onLoadChar(chars);
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
		const { thumbnail, name } = char;
		return (
			<li className="char__item">
				<img src={thumbnail} alt="abyss" />
				<div className="char__name">{name}</div>
			</li>
		);
	}
};
export default CharList;
