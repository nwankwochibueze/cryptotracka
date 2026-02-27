import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniChartProps {
  data: number[];
  width?: number;
  height?: number;
}

export function MiniChart({ data, width = 100, height = 40 }: MiniChartProps) {
  const chartData = data.map((price, index) => ({ price, index }));

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth={1}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
