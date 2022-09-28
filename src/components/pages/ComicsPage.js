import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList.js';
import ErrorBoundary from '../errorBoundary/ErrorBoundary.js';

const ComicsPage = () => {
	return (
		<>
			<ErrorBoundary>
				<AppBanner />
			</ErrorBoundary>
			<ErrorBoundary>
				<ComicsList />
			</ErrorBoundary>
		</>
	);
};
export default ComicsPage;
