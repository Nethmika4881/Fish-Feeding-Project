export default function SelectTank({ tanks, id }) {
  return (
    <div className="w-full">
      <select
        required
        name="tanks"
        id={id}
        className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
      >
        <option value="" disabled className="text-gray-400">
          Select tank...
        </option>
        {tanks.map((tank) => (
          <option key={tank.id} value={tank.id} className="py-3 text-gray-800">
            {tank.name}
          </option>
        ))}
      </select>
    </div>
  );
}
