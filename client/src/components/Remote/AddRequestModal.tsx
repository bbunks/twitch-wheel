/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Request } from "../../../types/Request";
import socket from "../../utils/socket";

interface proptypes {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  initalRequest: Request;
}

export default function AddRequestModal({
  open,
  setOpen,
  initalRequest,
}: proptypes) {
  const cancelButtonRef = useRef(null);
  const [username, setUsername] = useState(initalRequest.username);
  const [request, setRequest] = useState(initalRequest.request);

  useEffect(() => {
    if (open) {
      setUsername(initalRequest.username);
      setRequest(initalRequest.request);
    }
  }, [open]);

  function sendNewRequest() {
    if (username !== "" && request !== "") {
      console.log("emitting");
      socket.emit("add_request", {
        username,
        request,
      });
    } else {
      console.log("fail");
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Add a request
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="my-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        User
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="user"
                          id="user"
                          className="shadow-sm focus:ring-indigo-500 
                            focus:border-indigo-500 block w-full sm:text-sm 
                            border-gray-300 rounded-md p-2"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="my-4">
                      <label
                        htmlFor="request"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Request
                      </label>
                      <div className="mt-1">
                        <textarea
                          name="request"
                          id="request"
                          className="shadow-sm focus:ring-indigo-500
                            focus:border-indigo-500 block w-full sm:text-sm
                            border-gray-300 rounded-md p-2 resize-none"
                          placeholder="Make a request"
                          value={request}
                          onChange={(e) => setRequest(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {
                    sendNewRequest();
                    setOpen(false);
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
