import Head from 'next/head';
import { Container, SimpleGrid } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import MovieCard from '@/components/cards/movie-card';
import { useBreakpointValue } from '@chakra-ui/react';

export default function MyMovies() {
    const cardColumns = useBreakpointValue({ base: 1, md: 2, lg: 5 });

    return (
        <>
            <Head>
                <title>Coding Assignment | My Movies</title>
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
                    <SimpleGrid columns={cardColumns} spacing={{ base: 4, md: 6 }} mt={8}>
                        Test
                    </SimpleGrid>
                </Container>
            </main>
        </>
    );
}
