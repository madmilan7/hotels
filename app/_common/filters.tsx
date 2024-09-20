"use client";

import { Button } from "antd";
import { FilterX, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Filters({
  searchParams,
}: {
  searchParams: { checkIn: string; checkOut: string; type: string };
}) {
  const [checkIn, setCheckIn] = useState<string>(searchParams.checkIn || "");
  const [checkOut, setCheckOut] = useState<string>(searchParams.checkOut || "");
  const [type, setType] = useState<string>(searchParams.type || "");
  const router = useRouter();

  const onFilter = () => {
    const newSearchParamsObject = { ...searchParams, checkIn, checkOut, type };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    router.push(`/?${newSearchParams}`);
  };

  const onClear = () => {
    setCheckIn("");
    setCheckOut("");
    setType("");
    router.push("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7 items-end">
      {/* check in input */}
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">Check In Date</span>
        <input
          className="h-14 px-10 w-full bg-gray-200 outline-none"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      {/* check out input */}
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">Check Out Date</span>
        <input
          className="h-14 px-10 w-full bg-gray-200 outline-none"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      {/* type */}
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 text-sm">Type</span>
        <select
          className="h-14 px-10 w-full bg-gray-200 outline-none"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="Delux">Delux</option>
          <option value="Premium">Premium</option>
          <option value="Standard">Standard</option>
        </select>
      </div>
      {/* actions button */}
      <div className="flex gap-5">
        <Button
          type="primary"
          className="h-14 px-10 flex items-center"
          icon={<SearchIcon size={20} />}
          onClick={onFilter}
        >
          Search
        </Button>
        <Button
          className="h-14 px-10 flex items-center"
          icon={<FilterX size={20} />}
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default Filters;
