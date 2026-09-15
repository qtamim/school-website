"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type HoursTableProps = {
  days: DictionaryDays;
  hours: string;
  closed: string;
};

type DictionaryDays = [string, string, string, string, string, string, string];

const OPEN_DAYS = 5;

export function HoursTable({ days, hours, closed }: HoursTableProps) {
  const [today, setToday] = useState(2);

  useEffect(() => {
    setToday(new Date().getDay());
  }, []);

  return (
    <div className="flex gap-8 overflow-hidden">
      <ul className="flex flex-col items-start gap-2">
        {days.map((day, index) => (
          <li
            key={day}
            className={cn(
              "text-sm leading-normal",
              index === today ? "font-medium text-white" : "font-normal text-[#eee]"
            )}
          >
            {day}
          </li>
        ))}
      </ul>
      <ul className="flex flex-col items-start gap-2">
        {days.map((day, index) => (
          <li
            key={`${day}-hours`}
            className={cn(
              "text-sm leading-normal whitespace-nowrap",
              index === today ? "font-medium text-white" : "font-normal text-[#eee]"
            )}
          >
            {index < OPEN_DAYS ? hours : closed}
          </li>
        ))}
      </ul>
    </div>
  );
}
