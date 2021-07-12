import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Stack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { UserBotStore } from "../../../../store/userbot.store";
import IonCard from "../../components/IonCard";
import socket from "../../providers/socket.io";

export default () => {
  const logout = useDisclosure();
  // const userbot = UserBotStore.useState((s) => s);

  const LogoutConfirm = () => (
    <AlertDialog isOpen={logout.isOpen} onClose={logout.onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Logout
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You will be logged out.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              colorScheme="gray"
              onClick={() => {
                logout.onClose();
                socket.emit("logout");
              }}
            >
              Confirm
            </Button>
            <Button colorScheme="red" onClick={logout.onClose} ml={3}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Stack spacing={6}>
      <IonCard title="Settings" subTitle="Settings for your user bot">
        <Button colorScheme="red" size="sm" onClick={logout.onOpen}>
          Logout
        </Button>
      </IonCard>

      <LogoutConfirm />
    </Stack>
  );
};
