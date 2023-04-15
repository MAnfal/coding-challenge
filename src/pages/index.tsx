import Head from 'next/head';
import { Container, Input, FormHelperText, FormControl, SimpleGrid } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import MovieCard from '@/components/movie-card';
import { useBreakpointValue } from '@chakra-ui/react';

const searchMovie = async (title: string) => {
    toast.error('Test');
};

export default function Home() {
    const cardColumns = useBreakpointValue({ base: 1, md: 2, lg: 5 });

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
                        <Input variant="filled" placeholder="Search Movie By Title" />
                        <FormHelperText textAlign="center">Press Enter to search</FormHelperText>
                    </FormControl>

                    <SimpleGrid columns={cardColumns} spacing={{ base: 4, md: 6 }} mt={8}>
                        <MovieCard title="Test" description="test" />
                        <MovieCard title="Test 2" description="test 2" />
                        <MovieCard title="Test 3" description="test 3" />
                        <MovieCard title="Test 4" description="test 4" />
                        <MovieCard title="Test 5" description="test 5" />
                        <MovieCard title="Test" description="test" />
                        <MovieCard title="Test 2" description="test 2" />
                        <MovieCard title="Test 3" description="test 3" />
                        <MovieCard title="Test 4" description="test 4" />
                        <MovieCard title="Test 5" description="test 5" />
                        <MovieCard title="Test" description="test" />
                        <MovieCard title="Test 2" description="test 2" />
                        <MovieCard title="Test 3" description="test 3" />
                        <MovieCard title="Test 4" description="test 4" />
                        <MovieCard title="Test 5" description="test 5" />
                        <MovieCard title="Test" description="test" />
                        <MovieCard title="Test 2" description="test 2" />
                        <MovieCard title="Test 3" description="test 3" />
                        <MovieCard title="Test 4" description="test 4" />
                        <MovieCard title="Test 5" description="test 5" />
                    </SimpleGrid>
                </Container>
            </main>
        </>
    );
}
