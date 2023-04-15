import Head from 'next/head';
import {
    Container,
    Input,
    FormHelperText,
    FormControl,
    Flex,
    Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { has } from 'lodash';
import MovieCard, {ICompleteMovieCardProps, IMovieCardProps} from '@/components/cards/movie-card';
import {getBookmarkedMovies} from '@/lib/localStorage';
import SimplePagination from '@/components/pagination/simple-pagination';

export default function Home() {
    const [movies, setMovies] = useState<Array<ICompleteMovieCardProps>>([]);
    const storageData = getBookmarkedMovies();
    const [oldSurpriseSuggestion, setOldSurpriseSuggestion] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentTitle, setCurrentTitle] = useState<string>('');

    const searchMovie = async (title: string, isSurprise: boolean = false, page: number = 1) => {
        if (!title) {
            toast.error('Please enter a movie title....');
            return;
        }

        if (!isSurprise) {
            toast.loading('Finding movies....');
        }

        const response = await fetch(`/api/v1/movies/search?title=${title}&page=${page}`);

        const { data } = await response.json();

        console.log(data);

        toast.dismiss();

        if (data.Response === 'False' || !data.Search) {
            setMovies([]);

            toast.error('Failed to fetch movies....');
        }

        const movieInformation: Array<ICompleteMovieCardProps> = data.Search.map((movie: IMovieCardProps) => {
            const isStored = has(storageData, movie.imdbID);

            return {
                isStored,
                props: movie
            };
        });

        setMovies(movieInformation);
        setTotalPages(data.totalResults);
        setCurrentTitle(title);

        toast.success('Movies found....');
    };

    const onSurpriseMeClick = async () => {
        toast.loading('Finding movies....');

        const response = await fetch(`/api/v1/movies/surprise${oldSurpriseSuggestion ? '?oldSuggestion='+oldSurpriseSuggestion : ''}`);

        const data = await response.json();

        if (data?.success) {
            const movieRecommendation = data.movieRecommendation;

            setOldSurpriseSuggestion(movieRecommendation);

            await searchMovie(movieRecommendation, true);
        }
    }

    return (
        <>
            <Head>
                <title>CineMate</title>
                <meta name="description" content="CineMate" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container
                    maxW={{ base: '100%', md: '90%', lg: '90%' }}
                    px={{ base: 4, md: 0 }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="top"
                    width="100%"
                    height="100vh"
                >
                    <FormControl mt={8}>
                        <Container
                            maxW={{ base: '100%', md: '90%', lg: '80%' }}
                            px={{ base: 4, md: 0 }}
                            display="flex"
                            width="100%"
                        >
                            <Input
                                variant="filled"
                                placeholder="Search Movie By Title Or Just click on Surprise Me Button -->"
                                onKeyPress={async (e) => {
                                    if (e.key === 'Enter') {
                                        await searchMovie(e.currentTarget.value);
                                    }
                                }}
                            />
                            <Button
                                ml={2}
                                pl={6}
                                pr={6}
                                colorScheme="blue"
                                onClick={onSurpriseMeClick}
                            >
                                Surprise Me
                            </Button>
                        </Container>
                        <FormHelperText textAlign="center">Press Enter to search</FormHelperText>
                    </FormControl>

                    <Flex
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent={{ base: 'center' }}
                        rowGap={8}
                        columnGap={8}
                        mt={8}
                    >
                        {
                            movies.map((movie: ICompleteMovieCardProps) => <MovieCard {...movie} canBeWatched={false} key={movie.props.imdbID} />)
                        }
                    </Flex>

                    <SimplePagination
                        handlePageChange={
                            (currentPage: number) => searchMovie(currentTitle, false, currentPage)
                        }
                        totalPages={totalPages}
                    />
                </Container>
            </main>
        </>
    );
}
