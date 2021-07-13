import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";

export default () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const drawer = useDisclosure();

  return (
    <Box>
      <Box p={4} borderWidth="1px" rounded="md" bg="white">
        <Flex alignItems="center">
          <Heading size="md">Modes</Heading>
          <Spacer />
          <Button
            size="sm"
            leftIcon={<FiPlus />}
            variant="outline"
            onClick={drawer.onOpen}
          >
            New
          </Button>
        </Flex>

        <Box mt={4}>
          <Center>
            <Text>No modes, create a new one.</Text>
          </Center>
        </Box>
      </Box>

      <Drawer
        size="lg"
        isOpen={drawer.isOpen}
        placement="right"
        onClose={drawer.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>New Work Mode</DrawerHeader>

          <DrawerBody>
            <Stack spacing={6}>
              <FormControl id="email">
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter mode name" />
              </FormControl>

              <FormControl as="fieldset">
                <FormLabel as="legend">Trigger on</FormLabel>
                <RadioGroup defaultValue="time">
                  <HStack>
                    <Radio value="time">Time</Radio>
                    <Radio value="command">Command</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>

              <FormControl id="email">
                <FormLabel>Time</FormLabel>
                <Input placeholder="Enter mode name" />
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={drawer.onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
