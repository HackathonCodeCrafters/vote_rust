import CardItem from "../../../shared/components/CardSections";

interface DarkModeProps {
  darkMode?: boolean;
}

const stats = [
  { label: "Total Proposals", value: "127+" },
  { label: "Active Voters", value: "3.4K+" },
  { label: "Networks Supported", value: "4+" },
  { label: "Total Votes Cast", value: "15K+" },
];

export default function Stats({ darkMode = false }: DarkModeProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16">
      {stats.map((stat, index) => (
        <CardItem
          key={index}
          title={stat.value}
          description={stat.label}
          darkMode={darkMode}
          className="p-6 text-center"
          titleClassName="text-3xl font-bold mb-1"
          descriptionClassName={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}
