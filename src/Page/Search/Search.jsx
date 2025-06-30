import { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { useLazySearchPurchaseDataQuery } from "../../Redux/checkout/checkoutApi";

const Search = () => {
  const [formNo, setFormNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [result, setResult] = useState(null);

  const [triggerSearch, { data, isLoading, isError }] =
    useLazySearchPurchaseDataQuery();

  const handleSearch = () => {
    if (!formNo || !phoneNo) return alert("Please enter both fields");
    const payload = { form_no: formNo, phone_no: phoneNo };
    triggerSearch(payload);
  };

  useEffect(() => {
    if (data?.singleCoursePurchaseData) {
      setResult(data.singleCoursePurchaseData);
    }
  }, [data]);

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-100 text-gray-900">
      <h1 className="text-center text-3xl font-bold mb-8">
        Search Purchase Info
      </h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Form Number"
            value={formNo}
            onChange={(e) => setFormNo(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 duration-300 flex items-center gap-2"
          >
            <IoMdSearch /> Search
          </button>
        </div>

        {isLoading && <p className="mt-4 text-center">Loading...</p>}
        {isError && (
          <p className="mt-4 text-center text-red-600">Something went wrong</p>
        )}

        {result && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-bold mb-2">Purchase Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b py-1">
                  <span className="capitalize font-semibold">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="text-right">
                    {typeof value === "object" ? "—" : value || "N/A"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
