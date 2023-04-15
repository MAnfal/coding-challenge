import {HStack, IconButton, Text} from '@chakra-ui/react';
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {useState} from 'react';
interface ISimplePaginationProps {
    handlePageChange: (page: number) => void;
    totalPages: number;
}

export default function SimplePagination(props: ISimplePaginationProps) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (operation: string) => {
        const newPage = operation === 'inc' ? currentPage + 1 : currentPage - 1;

        setCurrentPage(newPage);
        props.handlePageChange(newPage);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return props.totalPages > 0 ? <HStack spacing={4} justifyContent="center" mt={8}>
        <IconButton
            isDisabled={currentPage === 1}
            onClick={() => handlePageChange('dec')}
            aria-label="Previous page"
            icon={<ChevronLeftIcon />}
        />
        <Text>
            {currentPage} of {props.totalPages}
        </Text>
        <IconButton
            isDisabled={currentPage >= props.totalPages}
            onClick={() => handlePageChange('inc')}
            aria-label="Next page"
            icon={<ChevronRightIcon />}
        />
    </HStack> : <></>;
}
