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
import { AddIcon, DeleteIcon, ViewIcon, CheckIcon } from '@chakra-ui/icons'
import {useState} from 'react';
import toast from 'react-hot-toast';
import {deleteBookmark, putBookMarkedMovieInStorage} from '@/lib/localStorage';
import {cloneDeep} from 'lodash';

export interface IMovieCardProps {
    Poster: string;
    Title: string;
    Type: string,
    Year: string,
    imdbID: string,
    isWatched: boolean
}

export interface ICompleteMovieCardProps {
    isStored: boolean;
    props: IMovieCardProps;
    handleMovieDeletion ?: (imdbID: string) => void;
    canBeWatched ?: boolean;
}

export default function MovieCard({ isStored, props, handleMovieDeletion, canBeWatched = true }: ICompleteMovieCardProps) {
    const [isBookmarked, setIsBookmarked] = useState<boolean>(isStored);
    const [isWatched, setIsWatched] = useState<boolean>(props.isWatched);

    const handleBookmarkClick = () => {
        let message;

        if (isBookmarked) {
            setIsBookmarked(false);

            const deletionResult = deleteBookmark(props.imdbID);

            if (deletionResult) {
                handleMovieDeletion && handleMovieDeletion(props.imdbID);
            }

            message = deletionResult ?
                'Removed from bookmarks' :
                'Failed to remove from bookmarks';
        } else {
            setIsBookmarked(true);

            const storageOperationResult = putBookMarkedMovieInStorage(props);

            message = storageOperationResult ?
                'Added to bookmarks' :
                'Failed to add to bookmarks'
        }

        toast.success(message);
    };

    const handleWatchStatusClick = () => {
        if (isWatched) {
            // We do not want to remove the watch status. By choice.
            toast.error('You cannot remove the watch status');
            return;
        }

        const clonedProps = cloneDeep(props);

        clonedProps.isWatched = true;

        const storageResult = putBookMarkedMovieInStorage(clonedProps);

        if (storageResult) {
            setIsWatched(true);

            toast.success('Added to watched list');
        } else {
            toast.error('Failed to add to watched list');
        }
    }

    const getWatchButton = () => {
        if (!canBeWatched) {
            return <></>;
        }

        return <Button
            flex='1'
            variant='ghost'
            leftIcon={isWatched ? <CheckIcon color='green.500' /> : <ViewIcon /> }
            onClick={handleWatchStatusClick}
        >
            { isWatched ? 'Watched' : 'Watching' }
        </Button>;
    }

    return <Card maxW='xs' variant='outline'>
        <CardHeader>
            <Heading size='md'>{props.Title}</Heading>
        </CardHeader>

        <CardBody>
            <Image
                src={props.Poster}
                alt={props.Title}
                borderRadius='lg'
                maxH='400px'
                objectFit='cover'
                objectPosition='center'
            />
        </CardBody>
        <Divider />
        <CardFooter>
            <Button flex='1' variant='ghost' leftIcon={isBookmarked ? <DeleteIcon color='red.500' /> : <AddIcon />} onClick={handleBookmarkClick}>
                {isBookmarked ? 'Remove' : 'Bookmark'}
            </Button>
            { getWatchButton() }
        </CardFooter>
    </Card>
}
