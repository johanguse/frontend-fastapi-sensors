export interface SensorData {
  equipment_id: number
  timestamp: string
  value: number
  id: number
}

export interface SensorDataResponse {
  items: SensorData[]
}
