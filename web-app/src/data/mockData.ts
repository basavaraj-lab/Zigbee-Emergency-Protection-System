export type Priority = 'HIGH' | 'MED' | 'LOW';
export type AlertType = 'FIRE' | 'GAS' | 'MEDICAL' | 'ROBBERY' | 'NORMAL';
export type Status = 'PENDING' | 'ACKNOWLEDGED' | 'RESOLVED' | 'DISPATCHED';

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
  
  // Real-time CV & Analytics Metadata
  confidence: number; // 0.0 to 1.0
  validation_frames?: number; // Temporal decision engine frames validated
  escalation_target?: string; // Routing target (Station, Hospital)
  camera_zone_id?: string; // e.g., CAM-04-LOBBY
  snapshot_ref?: string; // Event clip ID placeholder
  
  // Geospatial & Facility Data
  facility_name?: string;
  building?: string;
  floor?: string;
  sector?: string;
}

export const generateMockNodes = (): NodeData[] => [
  {
    node_id: 'ZBN-001',
    alert_type: 'FIRE',
    lat: 40.7128,
    lng: -74.0060,
    priority: 'HIGH',
    status: 'DISPATCHED',
    battery: 85,
    rssi: -45,
    hop_count: 2,
    last_heartbeat: new Date().toISOString(),
    temperature: 87.5,
    gas_level: 12,
    triggered_at: new Date(Date.now() - 120000).toISOString(),
    confidence: 0.98,
    validation_frames: 45,
    escalation_target: 'FDNY Station 10',
    camera_zone_id: 'CAM-01-LAB',
    snapshot_ref: 'evt_fire_5a9b8c.mp4',
    facility_name: 'Metro Industrial Complex',
    building: 'Bldg 3',
    floor: 'Level 2',
    sector: 'North Wing',
  },
  {
    node_id: 'ZBN-002',
    alert_type: 'ROBBERY',
    lat: 40.7138,
    lng: -74.0050,
    priority: 'HIGH',
    status: 'ACKNOWLEDGED',
    battery: 45,
    rssi: -65,
    hop_count: 1,
    last_heartbeat: new Date().toISOString(),
    temperature: 24.2,
    gas_level: 0,
    triggered_at: new Date(Date.now() - 360000).toISOString(),
    confidence: 0.92,
    validation_frames: 120,
    escalation_target: 'NYPD Precinct 1',
    camera_zone_id: 'CAM-05-SECURE-VAULT',
    snapshot_ref: 'evt_robbery_998dcf.jpg',
    facility_name: 'First National Bank',
    building: 'Main Branch',
    floor: 'Basement',
    sector: 'Vault Lobby',
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
    confidence: 0.99,
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
    confidence: 0.88,
    validation_frames: 30, // Activity inactivity threshold
    escalation_target: 'Mount Sinai EMS',
    camera_zone_id: 'CAM-12-CORRIDOR',
    snapshot_ref: 'evt_med_332acb.jpg',
    facility_name: 'City Tech Center',
    building: 'Hub 1',
    floor: 'Lobby',
    sector: 'East Entrance',
  },
];
