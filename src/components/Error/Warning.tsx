import { ToastAction, useToasts } from "@geist-ui/core";
import cuid2 from "@paralleldrive/cuid2";
import { useEffect } from "react";
import getErrorMessageFromUnknownError from "utilities/humanReadableError";

type WarningProps = {
  error: Error | string;
  onClear?: () => void;
};

const Warning = ({ error, onClear }: WarningProps) => {
  const { setToast, removeToastOneByID } = useToasts();

  const action: ToastAction = {
    name: "cancel",
    passive: true,
    handler: (_event, cancel) => {
      cancel();
      onClear && onClear();
    },
  };

  const message = getErrorMessageFromUnknownError(error);

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
