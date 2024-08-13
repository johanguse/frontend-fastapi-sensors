'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SensorData {
  equipment_id: number;
  timestamp: string;
  value: number;
  id: number;
}

export function MyChart({ data }: { data: SensorData[] }) {
  return (
    <div className="h-96">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) => {
            const date = new Date(timestamp);
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          }}
        />
        <YAxis />
        <Tooltip
          content={({ label, payload }) => {
            const date = new Date(label);
            return (
              <div className="bg-white p-2 shadow-md">
                <p className="text-gray-700 font-bold">
                  {date.toLocaleDateString()} {date.toLocaleTimeString()}
                </p>
                <p className="text-gray-500">Value: {payload?.[0]?.value}</p>
              </div>
            );
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
  );
}