import { useEffect, useRef, useState } from "react";
import { useModal } from "../../contexts/modal-context";
import CreateInvoiceModal from "../../modals/CreateInvoice";
import InvoiceList from "./InvoiceList";
import { useWebsocket } from "../../contexts/websocket-context";
import { Invoice } from "./types";

export const InvoicePage = () => {
  const [prevInvoices, setPrevInvoices] = useState<Invoice[]>([]);
  const invoicesArrayRef = useRef<Invoice[]>([]);
  const { openModal } = useModal();
  const socket = useWebsocket();

  const handleLoginClick = () => {
    openModal(<CreateInvoiceModal />);
  };
  useEffect(() => {
    invoicesArrayRef.current = prevInvoices; 
  }, [prevInvoices]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/invoice");
      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      const data = await response.json();
      setPrevInvoices(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInvoices();

    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("invoices", (updatedInvoices: Invoice[]) => {
      const existingInvoices: Invoice[] = [];
      const newInvoices: Invoice[] = [];

      updatedInvoices.forEach((updatedInvoice) => {
        if (
          invoicesArrayRef.current.find(
            (invoice) => invoice.label === updatedInvoice.label
          )
        ) {
          existingInvoices.push(updatedInvoice);
        } else {
          newInvoices.push(updatedInvoice);
        }
      });

      const updatedExistingInvoices = invoicesArrayRef.current.map(
        (prevInvoice) =>
          existingInvoices.find(
            (updatedInvoice) => updatedInvoice.label === prevInvoice.label
          ) || prevInvoice
      );

      const updatedInvoicesArray = [...newInvoices, ...updatedExistingInvoices];
      setPrevInvoices(updatedInvoicesArray);
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  return (
    <div>
      <div>
        <h1 className="font-thin text-3xl">Invoices</h1>
      </div>

      <div className="flex justify-between mt-9 mb-5">
        <div className="flex bg-neutral-200 border py-2 px-3 rounded-lg">
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            className="bg-transparent font-thin focus:outline-none"
            placeholder="Search invoices"
          />
        </div>
        <div>
          <button
            className="bg-lime-400 hover:bg-lime-500 py-2 px-3 flex gap-2 items-center rounded-lg text-sm"
            onClick={handleLoginClick}
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create Invoice
          </button>
        </div>
      </div>

      <InvoiceList invoices={prevInvoices} />
    </div>
  );
};
