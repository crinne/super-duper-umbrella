import { useState } from "react";
import { useModal } from "../contexts/modal-context";

const CreateInvoiceModal = () => {
  const { closeModal } = useModal();


  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    expire: "",
    label: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:4000/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          amount: parseInt(formData.amount, 10),
          expire: parseInt(formData.expire, 10),
          label: formData.label,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }
      closeModal()

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-96 py-4 px-10">
      <h2 className="text-xl font-semibold mb-4">New Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="label"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="label"
            className="
            font-thin
            w-full px-4 py-2 border rounded focus:outline-none focus:border-lime-500"
          />
        </div>
        <div>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="font-thin w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="font-thin w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <input
            type="number"
            id="expire"
            name="expire"
            value={formData.expire}
            onChange={handleChange}
            placeholder="Expires (in seconds)"
            className="font-thin w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateInvoiceModal;
