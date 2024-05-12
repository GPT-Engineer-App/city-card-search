import React, { useState, useEffect } from 'react';
import { Box, Input, SimpleGrid, Text, VStack, Image, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [editingCity, setEditingCity] = useState(null);

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

  const saveCityName = () => {
    const updatedCities = cities.map(c => c.id === editingCity.id ? {...c, name: editingCity.name} : c);
    setCities(updatedCities);
    setEditingCity(null);
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
            {editingCity && editingCity.id === city.id ? (
              <Input value={editingCity.name} onChange={(e) => setEditingCity({...editingCity, name: e.target.value})} />
            ) : (
              <Text fontSize="xl">{city.name}</Text>
            )}
            {editingCity && editingCity.id === city.id && (
              <Button colorScheme="green" size="sm" onClick={saveCityName}>Save</Button>
            )}
            <Text fontSize="md">Population: {city.population}</Text>
            <Button colorScheme="blue" size="sm" onClick={() => setEditingCity(city)}>Edit</Button>
          </Box>
        ))}
      </SimpleGrid>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent size="full">
          <ModalHeader>
            <Image src={`https://source.unsplash.com/random/?${selectedCity ? selectedCity.name : ''}`} alt="City Image" width="100%" height="30%"/>
            {selectedCity ? selectedCity.name : ''}
          </ModalHeader>
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