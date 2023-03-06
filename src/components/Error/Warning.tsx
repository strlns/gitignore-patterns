import { Button, ToastAction, useToasts } from "@geist-ui/core";
import cuid2 from "@paralleldrive/cuid2";
import { useEffect } from "react";

type WarningProps = {
  error: Error | string;
  onClear?: () => void;
};

const Warning = ({ error, onClear }: WarningProps) => {
  const { setToast, removeToastOneByID } = useToasts();
  const message =
    typeof error === "string"
      ? error
      : error && "message" in error //Not strictly needed if there is no dynamic data passed into this component.
      ? error.message
      : String(error);

  const action: ToastAction = {
    name: "cancel",
    passive: true,
    handler: (event, cancel) => {
      cancel();
      onClear && onClear();
    },
  };
  useEffect(() => {
    const id = cuid2.createId();
    setToast({ text: message, delay: 7500, id, actions: [action] });
    return () => {
      removeToastOneByID(id);
    };
  }, [message]);

  return null;
};

export default Warning;
