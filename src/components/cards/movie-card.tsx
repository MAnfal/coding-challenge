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
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {ReactElement, useState} from 'react';
import toast from 'react-hot-toast';
import {deleteBookmark, putBookMarkedMovieInStorage} from '@/lib/localStorage';

export interface IMovieCardProps {
    Poster: string;
    Title: string;
    Type: string,
    Year: string,
    imdbID: string,
}

export interface ICompleteMovieCardProps {
    isStored: boolean;
    props: IMovieCardProps;
}

export default function MovieCard({ isStored, props }: ICompleteMovieCardProps) {
    const addIcon = <AddIcon />;
    const deleteIcon = <DeleteIcon color='red.500' />;

    const [bookmarkIcon, setBookmarkIcon] = useState<ReactElement>(
        isStored ? deleteIcon : addIcon
    );
    const [isBookmarked, setIsBookmarked] = useState<boolean>(isStored);

    const handleClick = () => {
        let message;

        if (isBookmarked) {
            setBookmarkIcon(addIcon);
            setIsBookmarked(false);

            const deletionResult = deleteBookmark(props.imdbID);

            message = deletionResult ?
                'Removed from bookmarks' :
                'Failed to remove from bookmarks';
        } else {
            setBookmarkIcon(deleteIcon);
            setIsBookmarked(true);

            const storageOperationResult = putBookMarkedMovieInStorage(props);

            message = storageOperationResult ?
                'Added to bookmarks' :
                'Failed to add to bookmarks'
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
                {isBookmarked ? 'Remove From Bookmark' : 'Add to Bookmark'}
            </Button>
        </CardFooter>
    </Card>
}
