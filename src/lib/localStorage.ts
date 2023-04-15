import {IMovieCardProps} from '@/components/cards/movie-card';

const dataStore = typeof window !== 'undefined' ? window.localStorage : null;

const key = 'bookmarked_movies';

interface IBookMark {
    [key: string]: IMovieCardProps;
}

export const getBookmarkedMovies = (): IBookMark => {
    if (!dataStore) {
        return {};
    }

    const result = dataStore.getItem(key);

    return result ? JSON.parse(result) as IBookMark : {};
}

export const putBookMarkedMovieInStorage = (movie: IMovieCardProps) => {
    if (!dataStore) {
        return false;
    }

    const existingBookmarks = getBookmarkedMovies();

    existingBookmarks[movie.imdbID] = movie;

    dataStore.setItem(key, JSON.stringify(existingBookmarks));

    return true;
}

export const deleteBookmark = (movieID: string) => {
    if (!dataStore) {
        return false;
    }

    const existingBookmarks = getBookmarkedMovies();

    delete existingBookmarks[movieID];

    dataStore.setItem(key, JSON.stringify(existingBookmarks));

    return true;
}
