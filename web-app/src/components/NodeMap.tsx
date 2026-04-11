import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { NodeData } from '../data/mockData';

const customIcons: Record<NodeData['alert_type'], L.DivIcon> = {
  FIRE: L.divIcon({ className: 'custom-pin fire-pin', html: '<div class="pin hover-glow relative inline-flex rounded-full h-4 w-4 bg-red-500 shadow-md"></div>' }),
  GAS: L.divIcon({ className: 'custom-pin gas-pin', html: '<div class="pin hover-glow relative inline-flex rounded-full h-4 w-4 bg-amber-500 shadow-md"></div>' }),
  MEDICAL: L.divIcon({ className: 'custom-pin medical-pin', html: '<div class="pin hover-glow relative inline-flex rounded-full h-4 w-4 bg-cyan-500 shadow-md"></div>' }),
  ROBBERY: L.divIcon({ className: 'custom-pin robbery-pin', html: '<div class="pin hover-glow relative inline-flex rounded-full h-4 w-4 bg-fuchsia-500 shadow-md animate-pulse"></div>' }),
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
                <div className="font-bold text-lg mb-1 text-slate-200">
                  {node.facility_name ? node.facility_name : node.node_id}
                </div>
                
                {node.facility_name && (
                  <div className="text-[10px] text-slate-500 mb-1 flex gap-1">
                    {[node.building, node.floor, node.sector].filter(Boolean).join(' • ')}
                  </div>
                )}
                
                <div className="text-xs font-bold uppercase mb-2 flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className={node.alert_type === 'NORMAL' ? 'text-emerald-400' : 'text-red-400'}>
                    {node.alert_type} PROTOCOL
                  </span>
                  <span className="text-slate-400">{node.status}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs mb-2 font-mono">
                  <div className="text-slate-400">Zone: <span className="text-slate-200">{node.camera_zone_id || 'Ext'}</span></div>
                  {node.confidence && <div className="text-slate-400">Conf: <span className="text-blue-400">{(node.confidence * 100).toFixed(0)}%</span></div>}
                  {node.escalation_target && <div className="text-slate-400 col-span-2 truncate">Route: <span className="text-yellow-400">{node.escalation_target}</span></div>}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] bg-slate-950/50 p-2 rounded">
                  <div className="text-slate-500">Batt: <span className="font-mono text-emerald-400">{node.battery}%</span></div>
                  <div className="text-slate-500">RSSI: <span className="font-mono text-cyan-400">{node.rssi} dBm</span></div>
                  <div className="text-slate-500">Temp: <span className="font-mono text-slate-300">{node.temperature}°C</span></div>
                  <div className="text-slate-500">Gas: <span className="font-mono text-slate-300">{node.gas_level} ppm</span></div>
                </div>
                
                {node.snapshot_ref && (
                   <div className="mt-2 text-center text-[10px] text-blue-500 bg-blue-900/10 p-1 border border-blue-900/30 rounded cursor-pointer hover:bg-blue-900/30 transition-colors uppercase tracking-wider font-bold">
                     Review Captured Event Clip
                   </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        {focusedNode && <FocusMap center={focusedNode} />}
      </MapContainer>
    </div>
  );
}
