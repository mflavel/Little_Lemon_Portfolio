import { useEffect, useState } from "react";
import { VStack, HStack, Box, Image, Text, Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/menu-items/")
            .then(res => res.json())
            .then(data => setMenuItems(data))
            .catch(err => console.error(err));
    }, []);

    // Group items by type
    const grouped = menuItems.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
    }, {});

    return (
        <div style={{ padding: "2rem 5rem" }}>
            <Heading mb="2rem">Our Menu</Heading>

            {Object.keys(grouped).map((type) => (
                <div key={type} style={{ marginBottom: "3rem" }}>
                    <Heading size="lg" mb="1rem">{type.charAt(0).toUpperCase() + type.slice(1)}</Heading>
                    <HStack spacing="2rem" wrap="wrap">
                        {grouped[type].map((item) => (
                            <Box
                                key={item.id}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                p="4"
                                width="250px"
                                textAlign="center"
                            >
                                <img
                                    src={
                                        item.image
                                            ? (item.image.startsWith('http')
                                                ? item.image
                                                : `http://127.0.0.1:8000${item.image}`)
                                            : ''
                                    }
                                    alt={item.name}
                                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                />
                                <Heading size="md">{item.name}</Heading>
                                <Text fontWeight="bold">${item.price}</Text>
                                <Text fontSize="sm" mb="2">{item.description}</Text>
                                <Link to={`/menu-item/${item.id}`} state={{ item }}>
                                    <Button colorScheme="yellow" size="sm">Order Now</Button>
                                </Link>
                            </Box>
                        ))}
                    </HStack>
                </div>
            ))}
        </div>
    );
};

export default Menu;

