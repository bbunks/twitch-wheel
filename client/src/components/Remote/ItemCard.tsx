import { Request } from "../../../types/Request";

interface proptypes {
  username: string;
  request: string;
  onEdit: (request: Request) => void;
  onDelete: (request: Request) => void;
}

function ItemCard({ username, request, onEdit, onDelete }: proptypes) {
  return (
    <li className="bg-white shadow overflow-hidden px-4 py-4 sm:px-4 rounded-md">
      <div className="flex justify-between">
        <h1 className="text-xl">{username}</h1>
        <div className="flex gap-2">
          <div onClick={() => onEdit({ username, request })}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <div onClick={() => onDelete({ username, request })}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <p>{request}</p>
    </li>
  );
}

export default ItemCard;
