export default function StatusTag({ status }) {
  const getStyles = () => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-600";
      case "In Progress":
        return "bg-yellow-100 text-yellow-600";
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Accepted":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <span
      className={`inline-block text-sm font-medium px-2 py-1 rounded ${getStyles()}`}
    >
      {status}
    </span>
  );
}
