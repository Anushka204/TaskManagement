import React from "react";

const DailyExecutionTrend = () => {
  return (
    <div className="p-4 bg-white rounded-lg h-full w-full">
      <h2 className="text-lg font-bold mb-2">Daily Execution Trend</h2>
      <div className="grid grid-cols-7 gap-1">
        {[...Array(35)].map((_, index) => (
          <div
            key={index}
            className="w-4 h-4 bg-gray-300 rounded-full"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DailyExecutionTrend;
