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
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import useFetch from "use-http";

import { RiSettings6Fill, RiForbid2Line } from "react-icons/ri";
import ConfigEditor from "./components/ConfigEditor";

export default () => {
  const moduleDrawer = useDisclosure();
  const [activeModule, setActiveModule] = useState({});
  console.log("activeModule", activeModule);

  const [modules, setModules] = useState([]); // save loadede modules
  const moduleApi = useFetch("modules");

  useEffect(() => {
    moduleApi.get("active").then((data) => {
      setModules(data);
    });
  }, []);

  const ModuleInfo = (meta) => {
    const { name, description } = meta;

    return (
      <Box borderWidth="1px" rounded="lg">
        <Flex alignItems="center" bg="gray.100" p={4}>
          <Heading size="md">{name}</Heading>
          <Spacer />

          <ButtonGroup>
            <Button
              colorScheme="brand"
              size="sm"
              leftIcon={<RiSettings6Fill />}
              onClick={() => {
                setActiveModule(meta);
                moduleDrawer.onOpen();
              }}
            >
              Config
            </Button>

            <Button colorScheme="red" size="sm" leftIcon={<RiForbid2Line />}>
              Disable
            </Button>
          </ButtonGroup>
        </Flex>
        <Text mt={2} p={4}>
          {description}
        </Text>
      </Box>
    );
  };

  const renderAllModules = modules.map((info) => (
    <GridItem>
      <ModuleInfo {...info} />
    </GridItem>
  ));

  return (
    <Box>
      <Flex alignItems="center">
        <Heading size="md">Active Modules</Heading>
        <Spacer />
        <Button variant="outline" colorScheme="brand" size="sm">
          Browse Modules
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} mt={4}>
        {renderAllModules}
      </SimpleGrid>

      {/* Module Drawer */}

      <Drawer
        size="md"
        isOpen={moduleDrawer.isOpen}
        placement="right"
        onClose={() => {
          moduleDrawer.onClose();
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="gray.100">
            Configure: {activeModule.name}
          </DrawerHeader>

          <DrawerBody>
            <ConfigEditor {...activeModule.config} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={moduleDrawer.onClose}>
              Cancel
            </Button>
            <Button colorScheme="brand">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
