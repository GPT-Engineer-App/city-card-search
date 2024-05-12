import React, { useState, useEffect } from 'react';
import { Box, Input, SimpleGrid, Text, VStack, Image, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://sheetdb.io/api/v1/atvconiejzkc3')
      .then(response => response.json())
      .then(data => {
        setCities(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        setIsLoading(false);
      });
  }, []);

  const openModal = (city) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
  };

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  } else {
    return (
    <VStack spacing={4} align="stretch">
      <Input
        placeholder="Search cities..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SimpleGrid columns={3} spacing={4}>
        {filteredCities.map(city => (
          <Box key={city.id} p={5} shadow="md" borderWidth="1px" onClick={() => openModal(city)} cursor="pointer">
            <Image src={`https://source.unsplash.com/random/?${city.name}`} alt="City Image" mb={4} width="300px" height="200px" objectFit="cover" />
            <Text fontSize="xl">{city.name}</Text>
            <Text fontSize="md">Population: {city.population}</Text>
          </Box>
        ))}
      </SimpleGrid>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCity ? selectedCity.name : ''}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="md">Population: {selectedCity ? selectedCity.population : ''}</Text>
            {/* Add more details as needed */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
    );
  }
};

export default Cities;