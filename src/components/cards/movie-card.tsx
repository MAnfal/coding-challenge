import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Divider,
    Button,
    Image
} from '@chakra-ui/react'
import { AddIcon, CheckIcon } from '@chakra-ui/icons'
import {ReactElement, useState} from 'react';
import toast from 'react-hot-toast';

export interface IMovieCardProps {
    Poster: string;
    Title: string;
    Type: string,
    Year: string,
    imdbID: string,
}

export default function MovieCard(props: IMovieCardProps) {
    const [bookmarkIcon, setBookmarkIcon] = useState<ReactElement>(
        <AddIcon />
    );
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    const handleClick = () => {
        let message = '';

        if (isBookmarked) {
            setBookmarkIcon(<AddIcon />);
            setIsBookmarked(false);
            message = 'Removed from bookmarks';
        } else {
            setBookmarkIcon(<CheckIcon color='green.500' />);
            setIsBookmarked(true);
            message = 'Added to bookmarks';
        }

        toast.success(message);
    };


    return <Card maxW='xs' variant='outline'>
        <CardHeader>
            <Heading size='md'>{props.Title}</Heading>
        </CardHeader>

        <CardBody>
            <Image
                src={props.Poster}
                alt={props.Title}
                borderRadius='lg'
            />
        </CardBody>
        <Divider />
        <CardFooter>
            <Button flex='1' variant='ghost' leftIcon={bookmarkIcon} onClick={handleClick}>
                Like
            </Button>
        </CardFooter>
    </Card>
}
