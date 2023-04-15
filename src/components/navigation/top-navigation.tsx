// TopNavigation.js
import React, { useState } from 'react';
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'
import {
    Flex,
    Spacer,
    Box,
    Menu,
    MenuButton,
    MenuList,
    IconButton,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

interface IMenuItem {
    [key: string]: string;
}

const TopNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItems: IMenuItem = {
        'Home': '/',
        'My Movies': '/my-movies'
    };

    const renderDesktopMenuItems = () => {
        return Object.keys(menuItems).map((key: string) => (
            <Box key={key} px={4} cursor="pointer">
                <Link as={NextLink} href={`${menuItems[key]}`}>
                    <Text>{key}</Text>
                </Link>
            </Box>
        ));
    };

    const renderMobileMenuItems = () => {
        return Object.keys(menuItems).map((key) => (
            <Box key={key} cursor="pointer">
                <Link as={NextLink} href={`${menuItems[key]}`}>
                    <Text>{key}</Text>
                </Link>
            </Box>
        ));
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Flex as="nav" color="black" p={4} align="center">
            <Box display={{ base: 'none', md: 'flex' }} justifyContent="center" flexGrow={1}>
                {renderDesktopMenuItems()}
            </Box>
            <Spacer display={{ base: 'block', md: 'none' }} />
            <Box display={{ base: 'block', md: 'none' }}>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<HamburgerIcon />}
                        variant="outline"
                        onClick={handleToggle}
                    />
                    <Modal isOpen={isOpen} onClose={handleToggle}>
                        <ModalOverlay />
                        <ModalContent>
                            <MenuList zIndex={10} bg="white">
                                {renderMobileMenuItems()}
                            </MenuList>
                        </ModalContent>
                    </Modal>
                </Menu>
            </Box>
        </Flex>
    );
};

export default TopNavigation;