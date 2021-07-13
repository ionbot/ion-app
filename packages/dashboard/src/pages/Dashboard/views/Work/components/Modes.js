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
  Stack,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useFetch from "use-http";

export default () => {
  const workModeApi = useFetch("/workmode");

  const { register, handleSubmit } = useForm();

  const drawer = useDisclosure();

  const CreateMode = (data) => {
    console.log("data", data);
    workModeApi.post(data);
  };

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
          <DrawerHeader>New Mode</DrawerHeader>
          <form onSubmit={handleSubmit(CreateMode)}>
            <DrawerBody>
              <Text mb={4} textColor="gray.500">
                Create a new mode. For automatic trigger, you can enter times.
              </Text>

              <Stack spacing={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder="Enter mode name" {...register("name")} />
                </FormControl>

                <FormControl>
                  <FormLabel>Time</FormLabel>
                  <Input placeholder="HH:MM - HH:MM" {...register("time")} />
                  <FormHelperText>24 hour format</FormHelperText>
                </FormControl>

                {/* Message */}
                <FormControl>
                  <FormLabel>Your Message</FormLabel>
                  <Textarea
                    h={200}
                    placeholder="I am at work."
                    {...register("message")}
                  />
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={drawer.onClose}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
