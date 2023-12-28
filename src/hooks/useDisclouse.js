import { useState } from "react";

const useDisclouse = () => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(!isOpen);
  };
  const onClose = () => {
    setOpen(false);
  };
  return {
    onClose, onOpen,isOpen
  }
}

export default useDisclouse