export type Priority = 'HIGH' | 'MED' | 'LOW';
export type AlertType = 'FIRE' | 'GAS' | 'MEDICAL' | 'NORMAL';
export type Status = 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED';

export interface NodeData {
  node_id: string;
  alert_type: AlertType;
  lat: number;
  lng: number;
  priority: Priority;
  status: Status;
  battery: number;
  rssi: number;
  hop_count: number;
  last_heartbeat: string; // ISO string
  temperature: number;
  gas_level: number;
  triggered_at: string; // ISO string
}

export const generateMockNodes = (): NodeData[] => [
  {
    node_id: 'ZBN-001',
    alert_type: 'FIRE',
    lat: 40.7128,
    lng: -74.0060,
    priority: 'HIGH',
    status: 'PENDING',
    battery: 85,
    rssi: -45,
    hop_count: 2,
    last_heartbeat: new Date().toISOString(),
    temperature: 87.5,
    gas_level: 12,
    triggered_at: new Date(Date.now() - 120000).toISOString(),
  },
  {
    node_id: 'ZBN-002',
    alert_type: 'GAS',
    lat: 40.7138,
    lng: -74.0050,
    priority: 'MED',
    status: 'ACKNOWLEDGED',
    battery: 45,
    rssi: -65,
    hop_count: 1,
    last_heartbeat: new Date().toISOString(),
    temperature: 24.2,
    gas_level: 89,
    triggered_at: new Date(Date.now() - 360000).toISOString(),
  },
  {
    node_id: 'ZBN-003',
    alert_type: 'NORMAL',
    lat: 40.7148,
    lng: -74.0070,
    priority: 'LOW',
    status: 'RESOLVED',
    battery: 92,
    rssi: -30,
    hop_count: 0,
    last_heartbeat: new Date().toISOString(),
    temperature: 22.1,
    gas_level: 5,
    triggered_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    node_id: 'ZBN-004',
    alert_type: 'MEDICAL',
    lat: 40.7118,
    lng: -74.0080,
    priority: 'HIGH',
    status: 'PENDING',
    battery: 15,
    rssi: -85,
    hop_count: 3,
    last_heartbeat: new Date().toISOString(),
    temperature: 25.0,
    gas_level: 2,
    triggered_at: new Date(Date.now() - 60000).toISOString(),
  },
];
