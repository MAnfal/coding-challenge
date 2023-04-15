import Head from 'next/head';
import { Container, Input, FormHelperText, FormControl, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import MovieCard, {IMovieCardProps} from '@/components/cards/movie-card';

export default function Home() {
    const [movies, setMovies] = useState<Array<IMovieCardProps>>([]);

    const searchMovie = async (title: string) => {
        toast.loading('Finding movies....');

        const response = await fetch(`/api/v1/movies/search?title=${title}`);

        const { data } = await response.json();

        toast.dismiss();

        if (data.Response === 'False') {
            setMovies([]);

            toast.error('Failed to fetch movies....');
        }

        setMovies(data.Search as Array<IMovieCardProps>);

        toast.success('Movies found....');
    };

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
                    <FormControl mt={8}>
                        <Input
                            variant="filled"
                            placeholder="Search Movie By Title"
                            onKeyPress={async (e) => {
                                if (e.key === 'Enter') {
                                    await searchMovie(e.currentTarget.value);
                                }
                            }}
                        />
                        <FormHelperText textAlign="center">Press Enter to search</FormHelperText>
                    </FormControl>

                    <Flex
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent={{ base: 'center', md: 'space-between' }}
                        rowGap={8}
                        mt={8}
                    >
                        {
                            movies.map((movie: IMovieCardProps) => <MovieCard {...movie} key={movie.imdbID} />)
                        }
                    </Flex>
                </Container>
            </main>
        </>
    );
}
