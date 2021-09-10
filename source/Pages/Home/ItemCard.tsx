import React from "react";
import { Link } from "react-router-dom";
import { formatDistance } from 'date-fns'

interface IProps {
  item: any;
}

export function ItemCard({ item }: IProps) {
  return (
    
      <div className="card-main">
        <Link to={`/chat/${item.id}`} className="card-container">
          <div className="card-child-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 p-2 mt-4 text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
              />
            </svg>
          </div>
          <div className="card-child-2">
            <h2 className="font-extrabold text-gray-600 truncate">{item.recipient?.name}</h2>
            <h5 className="text-xs text-gray-500 leading truncate">{item.lastMsg}</h5>
          </div>
          <div className="card-child-3 text-right mr-4">
            <div className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-600 bg-green-100 rounded-full">
              {item.unseenNumbers}
            </div>
              <h6 className="text-xs text-gray-500"> {formatDistance(
  new Date(item.updatedAt),
  new Date(),
  { addSuffix: true }
)}</h6>
          </div>
        </Link>
      </div>
    
  );
}
