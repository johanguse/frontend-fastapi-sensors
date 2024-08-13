import { notFound } from "next/navigation";
import { MyChart } from "@/components/chart";

interface Equipment {
  id: number;
  equipment_id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface SensorData {
  equipment_id: number;
  timestamp: string;
  value: number;
  id: number;
}

export default async function EquipmentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [equipmentResponse, sensorResponse] = await Promise.all([
    fetch(`http://127.0.0.1:8000/api/v1/equipment/${id}?page=1&size=10`),
    fetch(
      `http://127.0.0.1:8000/api/v1/sensor-data?equipment_id=${id}&page=1&size=10`
    ),
  ]);

  if (!equipmentResponse.ok || !sensorResponse.ok) {
    notFound();
  }

  const equipment: Equipment = await equipmentResponse.json();
  const sensorData: { items: SensorData[] } = await sensorResponse.json();

  return (
    <div>
      <a href="/" className="text-blue-500">
        Back to home page
      </a>
      <div className="my-4">
        <h1>{equipment.name}</h1>
        <p>Equipment ID: {equipment.equipment_id}</p>
        <p>ID: {equipment.id}</p>
        <p>Created At: {equipment.created_at}</p>
        <p>Updated At: {equipment.updated_at}</p>

        <h2>Sensor Data</h2>
        <MyChart data={sensorData.items} />
      </div>
    </div>
  );
}
