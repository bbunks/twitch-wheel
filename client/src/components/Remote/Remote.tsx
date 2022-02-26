import ItemCard from "./ItemCard";
import socket from "../../utils/socket";
import AddRequestModal from "./AddRequestModal";
import { useState } from "react";
import { Request } from "../../../types/Request";

function Remote({ requests }) {
  const [showModal, setShowModal] = useState(false);
  const [initalRequest, setInitalRequest] = useState({
    username: "",
    request: "",
  });

  function editRequest(request: Request): void {
    setInitalRequest(request);
    setShowModal(true);
  }

  function deleteResponse(request: Request): void {
    socket.emit("delete_request", request);
  }

  return (
    <div className="max-w-[800px] min-w-[380px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[100vh] gap-8">
      <button
        onClick={() => {
          socket.emit("spin");
        }}
        type="button"
        className="inline-flex mx-[25%] justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Spin
      </button>
      <ul role="list" className="space-y-3 overflow-y-auto flex-grow">
        {requests.map((request) => {
          return (
            <ItemCard
              request={request.request}
              username={request.username}
              onEdit={() => editRequest(request)}
              onDelete={() => deleteResponse(request)}
            />
          );
        })}
      </ul>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className="inline-flex mx-[25%] justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add new request
      </button>
      <AddRequestModal
        setOpen={setShowModal}
        open={showModal}
        initalRequest={initalRequest}
      />
    </div>
  );
}

export default Remote;
