import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Heading,
  useDisclosure,
  Center,
  Text,
} from "@chakra-ui/react";

import { withRouter } from "react-router-dom";

import { FiBell } from "react-icons/fi";

import { RiMenu2Line, RiEyeFill, RiCodeLine } from "react-icons/ri";
import { UserBotStore } from "../../store/userbot.store";
import Sidebar from "./components/Sidebar";

const Layout = ({ children, match }) => {
  const { profile, ionv } = UserBotStore.useState((s) => s);
  const sidebar = useDisclosure();

  return (
    <Box bg={"gray.50"} minH="100vh">
      <Sidebar
        version={ionv}
        active={match.params.view}
        display={{ base: "none", md: "unset" }}
      />

      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar
            version={ionv}
            active={match.params.view}
            w="full"
            borderRight="none"
          />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={"white"}
          borderBottomWidth="1px"
          borderColor={"inherit"}
          h="14"
        >
          <IconButton
            display={{ base: "unset", md: "none" }}
            aria-label="Menu"
            onClick={sidebar.onOpen}
            icon={<RiMenu2Line />}
            variant="unstyled"
            size="sm"
          />
          <Heading size="md" fontWeight="semibold">
            {profile.firstName}
          </Heading>

          <Flex align="center">
            <Icon color="gray.500" as={FiBell} cursor="pointer" />
            <Avatar
              ml="4"
              size="md"
              name="anubra266"
              src="https://avatars.githubusercontent.com/u/52279511?s=200&v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(Layout);
