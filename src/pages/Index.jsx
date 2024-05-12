import { Container, Text, VStack, Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

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
    </Container>
  );
};

export default Index;