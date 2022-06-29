import './charList.scss';

import { Component } from 'react';
import Spinner from '../spinner/Spinner.js';
import ErrorMessage from '../errorMessage/ErrorMessage.js';
import MarvelService from '../../services/MarvelService.js';
class CharList extends Component {
	state = {
		charList: {},
		loading: true,
		error: false,
	};
	MarvelService = new MarvelService();

	componentDidMount = () => {
		console.log('Mount');
		this.MarvelService.getAllCharacters().then(this.onCharListLoaded).catch(this.onError);
	};
	onCharListLoaded = (charList) => {
		this.setState({ charList, loading: false });
	};

	onError = () => {
		this.setState({
			error: true,
			loading: false,
		});
	};

	renderItem(arr) {
		const test = Array.from(arr);
		const items = test.map((item) => {
			let imgStyle = item.imgNotAvailable ? { objectFit: 'unset' } : { objectFit: 'cover' };
			return (
				<li className="char__item" key={item.id}>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});
		return <ul className="char__grid">{items}</ul>;
	}

	render() {
		console.log('render');
		const { error, loading, charList } = this.state;

		const items = this.renderItem(charList);

		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? items : null;

		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{content}
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;
