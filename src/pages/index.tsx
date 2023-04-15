import Head from 'next/head'
import {Container, Input} from '@chakra-ui/react';
import toast from 'react-hot-toast';

const searchMovie = async (title: string) => {
    toast.error('Test');
}

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
          <Container
              display="flex"
              flexDirection="column"
              justifyContent="top"
              width="100vw"
              height="100vh"
          >
              <Input
                  variant='filled'
                  placeholder='Search Movie By Title'
              ></Input>
          </Container>
      </main>
    </>
  )
}
