import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import {
  FiBook,
  FiBox,
  FiSettings,
  FiCode,
  FiHome,
  FiClipboard,
} from "react-icons/fi";
import { useHistory } from "react-router-dom";

let NavItems = {
  home: {
    name: "Home",
    icon: FiHome,
  },
  modules: {
    name: "Modules",
    icon: FiBox,
  },
  commands: {
    name: "Commands",
    icon: FiCode,
  },
  collections: {
    name: "Collections",
    icon: FiBook,
  },
  logs: {
    name: "Logs",
    icon: FiClipboard,
  },
  settings: {
    name: "Settings",
    icon: FiSettings,
  },
};

export default ({ version, active, ...props }) => {
  const history = useHistory();
  const NavItem = (props) => {
    const { icon, id, children, ...rest } = props;
    return (
      <Flex
        onClick={() => history.push(`/${id}`)}
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={active === id ? "white" : "inherit"}
        bg={active === id && "brand.400"}
        _hover={{
          bg: active === id ? "brand.400" : "brand.100",
          color: active === id ? "white" : "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && <Icon mr="2" boxSize="4" as={icon} />}
        {children}
      </Flex>
    );
  };

  return (
    <Box
      as="nav"
      pos="fixed"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={"white"}
      borderColor={"inherit"}
      borderRightWidth="1px"
      w="100%"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        {/* <Image
          src="/assets/ion-logo.png"
          w={12}
          display={{ base: "none", md: "inline-flex" }}
        /> */}
        <Text fontSize="2xl" ml="2" fontWeight="light">
          ion v{version}
        </Text>
      </Flex>
      <Flex direction="column" fontSize="sm" color="gray.600">
        {Object.keys(NavItems).map((id) => {
          const item = NavItems[id];
          return (
            <NavItem id={id} icon={item.icon}>
              {item.name}
            </NavItem>
          );
        })}
      </Flex>
    </Box>
  );
};
