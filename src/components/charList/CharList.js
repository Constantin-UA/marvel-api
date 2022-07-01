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

	componentDidMount() {
		this.MarvelService.getAllCharacters().then(this.onCharListLoaded).catch(this.onError);
	}

	onCharListLoading = () => {
		this.setState({ loading: true });
	};

	onCharListLoaded = (charList) => {
		this.onCharListLoading();
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
			return (
				<li className="char__item" key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
					<img src={item.thumbnail} alt={item.name} style={item.imgNotAvailable} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});
		return <ul className="char__grid">{items}</ul>;
	}

	render() {
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
				<button className="button button__main button__long" id="loadMore">
					<div className="inner">load more</div>
				</button>
			</div>
		);
	}
}

export default CharList;
