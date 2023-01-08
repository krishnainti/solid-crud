import { Show } from "solid-js";
import Button from "./Button";
import CloseIcon from "./Icons/Close";

const ConfirmationModal = ({
  text = "Are you sure!",
  okText = "OK",
  noText = "NO",
  okAction,
  noAction,
  onClose,
  open,
}) => {
  return (
    <Show when={Boolean(open())}>
      <div
        class="fixed top-2/4 left-2/4 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal flex justify-center items-center"
        style={{ transform: " translate(-50%, -50%)" }}
      >
        <div class="relative w-96 h-full max-w-2xl">
          <div class="relative bg-white rounded-lg shadow">
            <div class="flex items-start justify-between p-4 rounded-t">
              <Button
                class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={onClose}
              >
                <CloseIcon />
                <span class="sr-only">Close modal</span>
              </Button>
            </div>

            <div class="p-6">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-center">
                {text}
              </p>
            </div>

            <div class="flex items-center items-center justify-evenly	p-6">
              <Button onClick={noAction} variant="red">
                {noText}
              </Button>

              <Button onClick={okAction} variant="green">
                {okText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default ConfirmationModal;
