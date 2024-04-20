import React from "react";
import { Invoice } from "./types";

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
interface StatusLabelProps {
  status: "paid" | "unpaid" | "expired";
}
const StatusLabel: React.FC<StatusLabelProps> = ({ status }) => {
  let statusClass = "";
  switch (status) {
    case "paid":
      statusClass = "bg-green-200 text-green-500";
      break;
    case "unpaid":
      statusClass = "bg-orange-200 text-orange-500";
      break;
    case "expired":
      statusClass = "bg-red-200 text-red-500";
      break;
    default:
      statusClass = "bg-gray-200 text-gray-500"; // Default color for unknown status
  }
  return (
    <div
      className={` rounded-md ${statusClass} font-light py-1 px-3 inline-block`}
    >
      {capitalizeFirst(status)}
    </div>
  );
};

// interface ExpiresLabelProps {
//   expiresAt: number;
// }
// const ExpiresLabel: React.FC<ExpiresLabelProps> = ({ expiresAt }) => {
//   const expiresAtUnixTimeMs = expiresAt * 1000;
//   const formattedExpiresDate = format(
//     new Date(expiresAtUnixTimeMs),
//     "d MMMM y"
//   );
//   const formattedExpiresTime = format(
//     new Date(expiresAtUnixTimeMs),
//     "HH:MM:SS"
//   );
//   return (
//     <div className="rounded-md flex flex-col font-light py-1 px-3">
//       <div>{formattedExpiresDate}</div>
//       <div className="text-sm text-neutral-400">at {formattedExpiresTime}</div>
//     </div>
//   );
// };

interface Description {
  description: string;
}
const DescriptionLabel: React.FC<Description> = ({ description }) => {
  return (
    <div className="rounded-md flex flex-col font-light py-1 px-3">
      {description}
    </div>
  );
};

interface InvoicesListProps {
  invoices: Invoice[];
}

const InvoiceList: React.FC<InvoicesListProps> = ({ invoices }) => {
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard:", text);
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <div className="flex flex-col">
          <div className="flex flex-row font-light text-slate-600">
            <div className="flex-1  py-2">LABEL</div>
            <div className="flex-1  py-2">DESCRIPTION</div>
            {/* <div className="flex-1  py-2">EXPIRES</div> */}
            <div className="flex-1  py-2">AMOUNT</div>
            <div className="flex-1  py-2">STATUS</div>
            <div className="flex-1  py-2">BOLT11</div>
            <div className="flex-1  py-2">ACTION</div>
          </div>

          {invoices.map((invoice, index) => (
            <div className="flex   border-b flex-row items-center" key={index}>
              <div className="flex-1  py-2">{invoice.label}</div>
              <div className="flex-1  py-2">
                {/* <ExpiresLabel expiresAt={invoice..expires_at} /> */}
                <DescriptionLabel description={invoice.description} />
              </div>
              <div className="flex-1   py-2">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F0D003"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    />
                  </svg>
                  {invoice.amount_msat}
                </div>
              </div>
              <div className="flex-1 py-2">
                <StatusLabel status={invoice.status} />
              </div>
              <div className="flex-1 py-2">
                <p
                  className="truncate max-w-16 cursor-pointer"
                  onClick={() => handleCopyToClipboard(invoice.bolt11)}
                >
                  {invoice.bolt11}
                </p>
              </div>
              <div className="flex-1 py-2">
                <button className=" hover:bg-neutral-100 py-2 px-3 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
