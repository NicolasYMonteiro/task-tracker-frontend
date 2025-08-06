const StatCard = ({ icon, title, value, percentage, color }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  percentage?: number;
  color: string;
}) => (
  <div className={`p-4 rounded-lg ${color}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-2 rounded-full bg-white shadow-xs">
        {icon}
      </div>
    </div>
    {percentage !== undefined && (
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{percentage}% do total</p>
      </div>
    )}
  </div>
);

export default StatCard;