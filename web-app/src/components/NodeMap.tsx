import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { NodeData } from '../data/mockData';

const customIcons = {
  FIRE: L.divIcon({ className: 'custom-pin fire-pin', html: '<div class="pin hover-glow relative inline-flex rounded-full h-4 w-4 bg-red-500 shadow-md"></div>' }),
  GAS: L.divIcon({ className: 'custom-pin gas-pin', html: '<div class="pin hover-glow relative inline-flex rounded-full h-4 w-4 bg-amber-500 shadow-md"></div>' }),
  MEDICAL: L.divIcon({ className: 'custom-pin medical-pin', html: '<div class="pin hover-glow relative inline-flex rounded-full h-4 w-4 bg-cyan-500 shadow-md"></div>' }),
  NORMAL: L.divIcon({ className: 'custom-pin normal-pin', html: '<div class="pin relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-md opacity-60"></div>' }),
};

function FocusMap({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 18, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export function NodeMap({ nodes, focusedNode }: { nodes: NodeData[], focusedNode: [number, number] | null }) {
  return (
    <div className="flex-1 relative z-0 h-full w-full bg-slate-950">
      <MapContainer center={[40.7128, -74.0060]} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={false} dragging={true}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {nodes.map(node => (
          <Marker 
            key={node.node_id} 
            position={[node.lat, node.lng]} 
            icon={customIcons[node.alert_type]}
          >
            <Popup className="emergency-popup">
              <div className="p-3 bg-slate-900 text-slate-100 rounded shadow-lg border border-slate-700 min-w-48">
                <div className="font-bold text-lg mb-1">{node.node_id}</div>
                <div className="text-xs uppercase text-slate-400 mb-2">{node.status} - {node.alert_type}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>Batt: <span className="font-mono text-emerald-400">{node.battery}%</span></div>
                  <div>RSSI: <span className="font-mono text-cyan-400">{node.rssi} dBm</span></div>
                  <div>Temp: <span className="font-mono">{node.temperature}°C</span></div>
                  <div>Gas: <span className="font-mono">{node.gas_level} ppm</span></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {focusedNode && <FocusMap center={focusedNode} />}
      </MapContainer>
    </div>
  );
}
