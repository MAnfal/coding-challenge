import Head from 'next/head';
import { Container, Flex, Text } from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import MovieCard, {ICompleteMovieCardProps, IMovieCardProps} from '@/components/cards/movie-card';
import {getBookmarkedMovies} from '@/lib/localStorage';

export default function Home() {
    const storageData = getBookmarkedMovies();

    const [movies, setMovies] = useState<Array<ICompleteMovieCardProps>>([]);

    useEffect(() => {
        const formattedMovies: Array<ICompleteMovieCardProps> = Object.values(storageData).map((movie: IMovieCardProps) => {
            return {
                isStored: true,
                props: movie
            };
        });

        setMovies(formattedMovies);
    }, []);

    return (
        <>
            <Head>
                <title>Coding Assignment</title>
                <meta name="description" content="Coding Assignment" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container
                    maxW={{ base: '100%', md: '90%', lg: '80%' }}
                    px={{ base: 4, md: 0 }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="top"
                    width="100%"
                    height="100vh"
                >
                    {movies.length ? (
                        <Flex
                            flexWrap="wrap"
                            alignItems="center"
                            justifyContent={{ base: 'center', md: 'space-between' }}
                            rowGap={8}
                            mt={8}
                        >
                            {movies.map((movie: ICompleteMovieCardProps) => (
                                <MovieCard {...movie} key={movie.props.imdbID} />
                            ))}
                        </Flex>
                    ) : (
                        <Flex
                            alignItems="center"
                            justifyContent="center"
                            height="100%"
                        >
                            <Text>No movies found.</Text>
                        </Flex>
                    )}
                </Container>
            </main>
        </>
    );
}
