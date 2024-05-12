import { Container, Text, VStack, Button, Link, Box, SimpleGrid, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const featuredCities = [
  { id: 1, name: 'New York', image: 'https://source.unsplash.com/random/?New York' },
  { id: 2, name: 'Paris', image: 'https://source.unsplash.com/random/?Paris' },
  { id: 3, name: 'Tokyo', image: 'https://source.unsplash.com/random/?Tokyo' }
];

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold" color="brand.800">City Management App</Text>
        <Text fontSize="xl" color="brand.700">
          Explore and manage your city data efficiently. Navigate through various cities' information and perform CRUD operations with ease.
        </Text>
        <Button colorScheme="blue" as={RouterLink} to="/cities">
          Go to Cities
        </Button>
      </VStack>
      <Box mt={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>Featured Cities</Text>
        <SimpleGrid columns={3} spacing={10}>
          {featuredCities.map(city => (
            <Box key={city.id} p={5} shadow="md" borderWidth="1px">
              <Image src={city.image} alt={city.name} mb={4} width="100%" height="200px" objectFit="cover" />
              <Text fontSize="xl">{city.name}</Text>
            </Box>
          ))}
        </SimpleGrid>
        <Button mt={4} colorScheme="blue" as={RouterLink} to="/cities">See all</Button>
      </Box>
    </Container>
  );
};

export default Index;