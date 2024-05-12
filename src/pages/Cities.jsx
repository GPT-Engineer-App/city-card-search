import React, { useState, useEffect } from 'react';
import { Box, Input, SimpleGrid, Text, VStack, Image } from '@chakra-ui/react';

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/atvconiejzkc3')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VStack spacing={4} align="stretch">
      <Input
        placeholder="Search cities..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SimpleGrid columns={3} spacing={4}>
        {filteredCities.map(city => (
          <Box key={city.id} p={5} shadow="md" borderWidth="1px">
            <Image src="https://via.placeholder.com/150" alt="City Image" mb={4} />
            <Text fontSize="xl">{city.name}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Cities;