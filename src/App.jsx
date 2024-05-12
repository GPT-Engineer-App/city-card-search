import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Index from "./pages/Index.jsx";
import Cities from "./pages/Cities.jsx";

function App() {
  return (
    <Router>
      <Box as="nav" bg="brand.800" p={3}>
        <Flex justify="space-between" align="center">
          <Link as={RouterLink} to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
          <Link as={RouterLink} to="/cities" style={{ textDecoration: 'none', color: 'white' }}>Cities</Link>
        </Flex>
      </Box>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/cities" element={<Cities />} />
      </Routes>
    </Router>
  );
}

export default App;
