import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";
import useFetch from "use-http";

export default () => {
  const [modules, setModules] = useState([]); // save loadede modules
  const moduleApi = useFetch("modules");

  useEffect(() => {
    moduleApi.get("active").then((data) => {
      setModules(data);
    });
  }, []);

  const ModuleInfo = ({ name, description }) => {
    return (
      <Box borderWidth="1px" rounded="lg">
        <Flex alignItems="center" bg="gray.100" p={4}>
          <Heading size="md">{name}</Heading>
          <Spacer />
          <Button colorScheme="red" size="sm">
            Unload
          </Button>
        </Flex>
        <Text mt={2} p={4}>
          {description}
        </Text>
      </Box>
    );
  };

  return (
    <Box>
      <Heading size="md">Active Modules</Heading>
      <SimpleGrid columns={4} mt={4}>
        {modules.map((info) => (
          <GridItem>
            <ModuleInfo {...info} />
          </GridItem>
        ))}
      </SimpleGrid>
    </Box>
  );
};
