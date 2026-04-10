import { useState, useCallback } from 'react';
import { ProtocolPanel } from '../components/ProtocolPanel';
import { CommandTopBar } from '../components/CommandTopBar';
import { ActiveEmergenciesSidebar } from '../components/ActiveEmergenciesSidebar';
import { NodeMap } from "../components/NodeMap"; 
import { MapLegend } from "../components/MapLegend"; 
import { SystemHealthDrawer } from '../components/SystemHealthDrawer';
import { RightUtilityRail } from '../components/RightUtilityRail';
import { generateMockNodes } from '../data/mockData';
import type { NodeData } from '../data/mockData';

export default function Dashboard() {
  const [nodes, setNodes] = useState<NodeData[]>(generateMockNodes());
  const [focusedNode, setFocusedNode] = useState<[number, number] | null>(null);
  const [isProtocolPanelOpen, setIsProtocolPanelOpen] = useState(false);

  const handleRefresh = useCallback(() => {
    setNodes(generateMockNodes());
  }, []);

  const handleCenterMap = useCallback(() => {
    setFocusedNode([40.7128, -74.0060]);
    setTimeout(() => setFocusedNode(null), 100);
  }, []);

  const handleFlyTo = useCallback((lat: number, lng: number) => {
    setFocusedNode([lat, lng]);
  }, []);

  const handleAcknowledge = useCallback((id: string) => {
    setNodes(prev => prev.map(n => 
      n.node_id === id ? { ...n, status: 'ACKNOWLEDGED' } : n
    ));
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden">
      <CommandTopBar 
        nodes={nodes} 
        onRefresh={handleRefresh} 
        onCenterMap={handleCenterMap} 
        onToggleProtocolPanel={() => setIsProtocolPanelOpen(!isProtocolPanelOpen)}
      />
      
      <div className="flex-1 flex overflow-hidden relative">
        <ActiveEmergenciesSidebar 
          nodes={nodes} 
          onFlyTo={handleFlyTo} 
          onAcknowledge={handleAcknowledge} 
        />
        
        <main className="flex-1 relative flex flex-col z-0 max-h-full">
          <MapLegend />
          <NodeMap 
            nodes={nodes} 
            focusedNode={focusedNode} 
          />
          
          <RightUtilityRail nodes={nodes} />
          <SystemHealthDrawer nodes={nodes} onRowClick={handleFlyTo} />
          <ProtocolPanel isOpen={isProtocolPanelOpen} onClose={() => setIsProtocolPanelOpen(false)} />
        </main>
      </div>

      <footer className="h-8 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-4 z-[60] relative shrink-0">
        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> API: SECURE</span>
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> WSS: CONNECTED</span>
        </div>
        <div className="text-[10px] font-mono text-slate-600">
          SENTINEL MESH V1.0.0 • BUILD 2026.04.10
        </div>
      </footer>
    </div>
  );
}
