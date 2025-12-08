import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, RefreshCw, Activity } from 'lucide-react';
import { NetNode, Packet, PacketType, NodeType } from '../types';

interface NetworkSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetworkSimulator: React.FC<NetworkSimulatorProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [stats, setStats] = useState({ sent: 0, delivered: 0 });
  const [topology, setTopology] = useState<'mesh' | 'star' | 'ring' | 'bus'>('mesh');

  // State refs for animation loop
  const nodesRef = useRef<NetNode[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const frameRef = useRef<number>(0);
  const lastPacketTimeRef = useRef<number>(0);

  // Initialize Topology
  useEffect(() => {
    initTopology(topology);
  }, [topology]);

  const initTopology = (type: 'mesh' | 'star' | 'ring' | 'bus') => {
    const width = 800;
    const height = 500;
    const cx = width / 2;
    const cy = height / 2;
    
    let newNodes: NetNode[] = [];

    if (type === 'mesh') {
      newNodes = [
        { id: 'r1', type: 'router', x: cx, y: cy, label: 'Core Router' },
        { id: 's1', type: 'switch', x: cx - 150, y: cy - 100, label: 'Switch A' },
        { id: 's2', type: 'switch', x: cx + 150, y: cy - 100, label: 'Switch B' },
        { id: 'srv1', type: 'server', x: cx - 250, y: cy + 100, label: 'DB Server' },
        { id: 'srv2', type: 'server', x: cx + 250, y: cy + 100, label: 'Web Server' },
        { id: 'c1', type: 'client', x: cx - 300, y: cy - 150, label: 'Client 1' },
        { id: 'c2', type: 'client', x: cx + 300, y: cy - 150, label: 'Client 2' },
      ];
    } else if (type === 'star') {
      newNodes = [
        { id: 'hub', type: 'router', x: cx, y: cy, label: 'Central Hub' },
        { id: 'n1', type: 'client', x: cx, y: cy - 180, label: 'Node 1' },
        { id: 'n2', type: 'client', x: cx + 170, y: cy - 60, label: 'Node 2' },
        { id: 'n3', type: 'client', x: cx + 170, y: cy + 140, label: 'Node 3' },
        { id: 'n4', type: 'client', x: cx - 170, y: cy + 140, label: 'Node 4' },
        { id: 'n5', type: 'client', x: cx - 170, y: cy - 60, label: 'Node 5' },
      ];
    } else if (type === 'ring') {
      const radius = 180;
      const count = 6;
      for (let i = 0; i < count; i++) {
        const angle = (i * 2 * Math.PI) / count;
        newNodes.push({
          id: `r${i}`,
          type: 'router',
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle),
          label: `Node ${i + 1}`
        });
      }
    } else if (type === 'bus') {
      const count = 5;
      const spacing = 140;
      const startX = cx - ((count - 1) * spacing) / 2;
      
      for (let i = 0; i < count; i++) {
        // Backbone node (tap) - these act as connectors on the bus line
        newNodes.push({
          id: `tap_${i}`,
          type: 'switch', 
          x: startX + i * spacing,
          y: cy,
          label: ''
        });
        
        // Device attached to the tap
        const isTop = i % 2 === 0;
        newNodes.push({
          id: `dev_${i}`,
          type: i === 0 || i === count - 1 ? 'server' : 'client',
          x: startX + i * spacing,
          y: isTop ? cy - 120 : cy + 120,
          label: i === 0 ? 'File Server' : i === count - 1 ? 'Backup' : `Workstation ${i}`
        });
      }
    }

    nodesRef.current = newNodes;
    packetsRef.current = [];
    setStats({ sent: 0, delivered: 0 });
  };

  // Helper to determine next routing hop
  const getNextHop = (currentId: string, finalId: string, nodes: NetNode[]): string => {
    if (currentId === finalId) return currentId;

    if (topology === 'star') {
       if (currentId === 'hub') return finalId;
       return 'hub';
    }

    if (topology === 'ring') {
       const currentIdx = nodes.findIndex(n => n.id === currentId);
       if (currentIdx === -1) return finalId;
       const nextIdx = (currentIdx + 1) % nodes.length;
       return nodes[nextIdx].id;
    }

    if (topology === 'bus') {
       // From Device to its Tap
       if (currentId.startsWith('dev_')) {
          const idx = currentId.split('_')[1];
          return `tap_${idx}`;
       }
       // From Tap to Tap or Device
       if (currentId.startsWith('tap_')) {
          const currentTapIdx = parseInt(currentId.split('_')[1]);
          // If this tap connects to the destination device
          if (finalId === `dev_${currentTapIdx}`) return finalId;
          
          // Otherwise, travel along the bus
          const destDevIdx = parseInt(finalId.split('_')[1]);
          if (destDevIdx > currentTapIdx) return `tap_${currentTapIdx + 1}`;
          return `tap_${currentTapIdx - 1}`;
       }
    }

    if (topology === 'mesh') {
        // Routing Table Logic for Mesh
        if (currentId === 'r1') {
            if (['c1', 's1'].includes(finalId)) return 's1';
            if (['c2', 's2'].includes(finalId)) return 's2';
            if (finalId === 'srv1') return 'srv1';
            if (finalId === 'srv2') return 'srv2';
            return finalId; 
        }
        if (currentId === 's1') {
            if (finalId === 'c1') return 'c1';
            return 'r1';
        }
        if (currentId === 's2') {
            if (finalId === 'c2') return 'c2';
            return 'r1';
        }
        // Leaf nodes
        if (currentId === 'c1') return 's1';
        if (currentId === 'c2') return 's2';
        if (currentId === 'srv1' || currentId === 'srv2') return 'r1';
    }

    return finalId;
  };

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (time: number) => {
      if (!isPlaying) {
        frameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const nodes = nodesRef.current;
      
      // Draw Connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      if (topology === 'bus') {
          // Draw Backbone (Thicker)
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          const taps = nodes.filter(n => n.id.startsWith('tap_'));
          for (let i = 0; i < taps.length - 1; i++) {
             ctx.moveTo(taps[i].x, taps[i].y);
             ctx.lineTo(taps[i+1].x, taps[i+1].y);
          }
          ctx.stroke();
          
          // Draw Drop Lines (Thinner)
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          const devs = nodes.filter(n => n.id.startsWith('dev_'));
          devs.forEach(dev => {
             const idx = dev.id.split('_')[1];
             const tap = nodes.find(n => n.id === `tap_${idx}`);
             if (tap) {
                 ctx.moveTo(dev.x, dev.y);
                 ctx.lineTo(tap.x, tap.y);
             }
          });
      } else if (topology === 'mesh') {
        const r1 = nodes.find(n => n.id === 'r1');
        if (r1) {
           nodes.forEach(n => {
             if (n.id !== 'r1') {
               let target = r1;
               if (n.type === 'client') {
                 const s = nodes.find(sw => sw.type === 'switch' && Math.abs(sw.x - n.x) < 200);
                 if (s) target = s;
               } else if (n.type === 'switch') {
                 target = r1;
               } else if (n.type === 'server') {
                 const s = nodes.find(sw => sw.type === 'switch' && Math.abs(sw.x - n.x) < 200);
                 if (s) target = s;
                 else target = r1;
               }
               ctx.moveTo(n.x, n.y);
               ctx.lineTo(target.x, target.y);
             }
           });
        }
      } else if (topology === 'star') {
        const hub = nodes.find(n => n.id === 'hub');
        if (hub) {
          nodes.forEach(n => {
            if (n.id !== 'hub') {
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(hub.x, hub.y);
            }
          });
        }
      } else if (topology === 'ring') {
         for (let i = 0; i < nodes.length; i++) {
           const next = nodes[(i + 1) % nodes.length];
           ctx.moveTo(nodes[i].x, nodes[i].y);
           ctx.lineTo(next.x, next.y);
         }
      }
      ctx.stroke();

      // Draw Nodes
      nodes.forEach(node => {
        // Taps are smaller
        const isTap = node.id.startsWith('tap_');
        
        ctx.fillStyle = getNodeColor(node.type);
        ctx.shadowBlur = isTap ? 5 : 10;
        ctx.shadowColor = getNodeColor(node.type);
        ctx.beginPath();
        
        if (isTap) {
             ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        } else if (node.type === 'switch' || node.type === 'router') {
            ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        } else {
            ctx.rect(node.x - 10, node.y - 10, 20, 20);
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        if (node.label) {
            ctx.fillStyle = 'rgba(255,255,255,0.95)';
            ctx.font = '11px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.fillText(node.label, node.x, node.y + 25);
        }
      });

      // Spawn Packets
      if (time - lastPacketTimeRef.current > 800) {
        spawnPacket();
        lastPacketTimeRef.current = time;
      }

      // Update and Draw Packets
      packetsRef.current.forEach((pkt, i) => {
        const speed = 3; // Slightly faster for multi-hop
        
        // Target coordinates
        const targetNode = nodes.find(n => n.id === pkt.to);
        const tx = targetNode?.x || 0;
        const ty = targetNode?.y || 0;
        
        const dx = tx - pkt.currentX;
        const dy = ty - pkt.currentY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < speed) {
          handlePacketArrival(pkt, i, nodes);
        } else {
          const angle = Math.atan2(dy, dx);
          pkt.currentX += Math.cos(angle) * speed;
          pkt.currentY += Math.sin(angle) * speed;
          
          ctx.fillStyle = pkt.color;
          ctx.shadowColor = pkt.color;
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(pkt.currentX, pkt.currentY, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isPlaying, topology]);

  const getNodeColor = (type: NodeType) => {
    switch (type) {
      case 'router': return 'var(--color-accent)';
      case 'switch': return '#FFBD2E';
      case 'server': return '#FF5F57';
      default: return 'var(--color-primary)';
    }
  };

  const spawnPacket = () => {
    const nodes = nodesRef.current;
    if (nodes.length < 2) return;
    
    // Pick valid endpoints (ignore infrastructure nodes for traffic generation usually)
    const endpoints = nodes.filter(n => ['client', 'server'].includes(n.type));
    // Fallback if no endpoints (like Ring of only routers)
    const validNodes = endpoints.length > 1 ? endpoints : nodes;

    const startNode = validNodes[Math.floor(Math.random() * validNodes.length)];
    let endNode = validNodes[Math.floor(Math.random() * validNodes.length)];
    // Retry once to avoid self-loop, but allow if only 1 node
    let retries = 0;
    while (endNode.id === startNode.id && retries < 5) {
        endNode = validNodes[Math.floor(Math.random() * validNodes.length)];
        retries++;
    }
    
    if (endNode.id === startNode.id) return;

    const types: PacketType[] = ['TCP', 'UDP', 'HTTP', 'DNS'];
    const type = types[Math.floor(Math.random() * types.length)];
    const colors = { TCP: '#61dafb', UDP: '#ff80bf', HTTP: '#50fa7b', DNS: '#f1fa8c' };

    const firstHop = getNextHop(startNode.id, endNode.id, nodes);

    packetsRef.current.push({
      id: Math.random().toString(36),
      from: startNode.id,
      to: firstHop,
      currentX: startNode.x,
      currentY: startNode.y,
      progress: 0,
      type,
      color: colors[type],
      finalDest: endNode.id
    });
    setStats(s => ({ ...s, sent: s.sent + 1 }));
  };

  const handlePacketArrival = (pkt: Packet, idx: number, nodes: NetNode[]) => {
      // Arrived at current hop
      if (pkt.to === pkt.finalDest) {
          // Reached final destination
          packetsRef.current.splice(idx, 1);
          setStats(s => ({ ...s, delivered: s.delivered + 1 }));
      } else {
          // Hop to next node
          pkt.from = pkt.to;
          pkt.to = getNextHop(pkt.to, pkt.finalDest, nodes);
          // Snap to current node position for precision
          const currentNode = nodes.find(n => n.id === pkt.from);
          if (currentNode) {
              pkt.currentX = currentNode.x;
              pkt.currentY = currentNode.y;
          }
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl glass-panel rounded-xl overflow-hidden flex flex-col h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-bold font-mono text-white">Network Simulator v1.0</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 bg-black/20 font-mono text-sm text-white">
          <div className="flex gap-4">
             <div className="flex items-center gap-2">
               <span className="text-white/80">Topology:</span>
               <select 
                 value={topology}
                 onChange={(e) => setTopology(e.target.value as any)}
                 className="bg-black/50 border border-white/30 rounded px-2 py-1 text-white focus:outline-none focus:border-accent"
               >
                 <option value="mesh" className="bg-black text-white">Mesh Network</option>
                 <option value="star" className="bg-black text-white">Star Topology</option>
                 <option value="ring" className="bg-black text-white">Token Ring</option>
                 <option value="bus" className="bg-black text-white">Bus Topology</option>
               </select>
             </div>
             <button 
               onClick={() => setIsPlaying(!isPlaying)}
               className="flex items-center gap-2 px-3 py-1 rounded bg-accent text-black font-bold hover:opacity-90"
             >
               {isPlaying ? <Pause size={14} /> : <Play size={14} />}
               {isPlaying ? 'PAUSE' : 'RESUME'}
             </button>
             <button 
               onClick={() => initTopology(topology)}
               className="p-1 text-white hover:text-accent transition-colors"
               title="Reset"
             >
               <RefreshCw size={16} />
             </button>
          </div>
          
          <div className="flex gap-6 text-white/80">
            <span>PKTS_SENT: <span className="text-white font-bold">{stats.sent}</span></span>
            <span>DELIVERED: <span className="text-accent font-bold">{stats.delivered}</span></span>
            <span className="animate-pulse text-green-400 font-bold">● LIVE</span>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative bg-black/40 overflow-hidden cursor-crosshair">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={500} 
            className="w-full h-full object-contain"
          />
          {/* Legend */}
          <div className="absolute bottom-4 left-4 p-3 rounded bg-black/80 border border-white/20 text-xs font-mono pointer-events-none text-white">
             <div className="mb-2 font-bold text-white">Packet Types</div>
             <div className="grid grid-cols-2 gap-x-4 gap-y-1">
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#61dafb]"></span>TCP</div>
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ff80bf]"></span>UDP</div>
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#50fa7b]"></span>HTTP</div>
               <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#f1fa8c]"></span>DNS</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { NetworkSimulator };
export default NetworkSimulator;
