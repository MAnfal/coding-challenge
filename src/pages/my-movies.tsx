import Head from 'next/head'
import {Container, Input} from '@chakra-ui/react';
import TopNavigation from '@/components/navigation/top-navigation';

export default function Home() {
    return (
        <>
            <Head>
                <title>Coding Assignment</title>
                <meta name="description" content="Coding Assignment" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                Test
            </main>
        </>
    )
}
