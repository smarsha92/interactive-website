import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Play, Pause, Plus } from '@phosphor-icons/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useTypewriter } from '@/hooks/use-typewriter';

interface Node {
  id: string;
  x: number;
  y: number;
  type: 'router' | 'switch' | 'server' | 'client';
  label: string;
}

interface Edge {
  from: string;
  to: string;
}

interface Packet {
  id: string;
  type: 'TCP' | 'UDP' | 'HTTP' | 'DNS';
  path: string[];
  currentIndex: number;
  progress: number;
  color: string;
}

interface NetworkSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const PACKET_COLORS = {
  TCP: '#00f5ff',
  UDP: '#ff00ff',
  HTTP: '#00ff00',
  DNS: '#ff8800',
};

const TOPOLOGIES = {
  mesh: {
    nodes: [
      { id: 'r1', x: 150, y: 100, type: 'router' as const, label: 'Router 1' },
      { id: 'r2', x: 450, y: 100, type: 'router' as const, label: 'Router 2' },
      { id: 'r3', x: 300, y: 250, type: 'router' as const, label: 'Router 3' },
      { id: 's1', x: 150, y: 350, type: 'server' as const, label: 'Server' },
      { id: 'c1', x: 450, y: 350, type: 'client' as const, label: 'Client' },
    ],
    edges: [
      { from: 'r1', to: 'r2' },
      { from: 'r1', to: 'r3' },
      { from: 'r2', to: 'r3' },
      { from: 'r3', to: 's1' },
      { from: 'r3', to: 'c1' },
      { from: 'r1', to: 's1' },
      { from: 'r2', to: 'c1' },
    ],
  },
  star: {
    nodes: [
      { id: 'sw1', x: 300, y: 200, type: 'switch' as const, label: 'Switch' },
      { id: 'c1', x: 150, y: 100, type: 'client' as const, label: 'Client 1' },
      { id: 'c2', x: 450, y: 100, type: 'client' as const, label: 'Client 2' },
      { id: 'c3', x: 100, y: 300, type: 'client' as const, label: 'Client 3' },
      { id: 's1', x: 500, y: 300, type: 'server' as const, label: 'Server' },
    ],
    edges: [
      { from: 'sw1', to: 'c1' },
      { from: 'sw1', to: 'c2' },
      { from: 'sw1', to: 'c3' },
      { from: 'sw1', to: 's1' },
    ],
  },
  ring: {
    nodes: [
      { id: 'r1', x: 300, y: 80, type: 'router' as const, label: 'Router 1' },
      { id: 'r2', x: 480, y: 200, type: 'router' as const, label: 'Router 2' },
      { id: 'r3', x: 400, y: 370, type: 'router' as const, label: 'Router 3' },
      { id: 'r4', x: 200, y: 370, type: 'router' as const, label: 'Router 4' },
      { id: 'r5', x: 120, y: 200, type: 'router' as const, label: 'Router 5' },
    ],
    edges: [
      { from: 'r1', to: 'r2' },
      { from: 'r2', to: 'r3' },
      { from: 'r3', to: 'r4' },
      { from: 'r4', to: 'r5' },
      { from: 'r5', to: 'r1' },
    ],
  },
};

export function NetworkSimulator({ isOpen, onClose }: NetworkSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [topology, setTopology] = useState<'mesh' | 'star' | 'ring'>('mesh');
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState([50]);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [stats, setStats] = useState({ sent: 0, delivered: 0, inTransit: 0, dropped: 0 });
  
  const heading = useTypewriter('Network Packet Simulator', 120);
  const labelTopology = useTypewriter('Topology', 120);
  const labelSpeed = useTypewriter(`Speed: ${speed}%`, 120);
  const labelSent = useTypewriter('Sent', 120);
  const labelInTransit = useTypewriter('In Transit', 120);
  const labelDelivered = useTypewriter('Delivered', 120);
  const labelDropped = useTypewriter('Dropped', 120);

  const currentTopology = TOPOLOGIES[topology];

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const computedStyle = window.getComputedStyle(document.documentElement);
      const accentColor = computedStyle.getPropertyValue('--accent').trim();
      const foregroundColor = computedStyle.getPropertyValue('--foreground').trim();

      currentTopology.edges.forEach(edge => {
        const fromNode = currentTopology.nodes.find(n => n.id === edge.from);
        const toNode = currentTopology.nodes.find(n => n.id === edge.to);
        if (fromNode && toNode) {
          ctx.strokeStyle = accentColor || '#00f5ff';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      currentTopology.nodes.forEach(node => {
        const nodeColors = {
          router: accentColor || '#00f5ff',
          switch: '#ff00ff',
          server: '#00ff00',
          client: foregroundColor || '#ffffff',
        };

        ctx.fillStyle = nodeColors[node.type];
        ctx.strokeStyle = nodeColors[node.type];
        ctx.lineWidth = 3;

        if (node.type === 'router') {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y - 15);
          ctx.lineTo(node.x + 13, node.y + 7);
          ctx.lineTo(node.x - 13, node.y + 7);
          ctx.closePath();
          ctx.stroke();
          ctx.globalAlpha = 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;
        } else if (node.type === 'switch') {
          ctx.strokeRect(node.x - 15, node.y - 10, 30, 20);
          ctx.globalAlpha = 0.3;
          ctx.fillRect(node.x - 15, node.y - 10, 30, 20);
          ctx.globalAlpha = 1;
        } else if (node.type === 'server') {
          ctx.strokeRect(node.x - 12, node.y - 15, 24, 30);
          ctx.globalAlpha = 0.3;
          ctx.fillRect(node.x - 12, node.y - 15, 24, 30);
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.moveTo(node.x - 8, node.y - 8);
          ctx.lineTo(node.x + 8, node.y - 8);
          ctx.moveTo(node.x - 8, node.y);
          ctx.lineTo(node.x + 8, node.y);
          ctx.moveTo(node.x - 8, node.y + 8);
          ctx.lineTo(node.x + 8, node.y + 8);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        ctx.fillStyle = foregroundColor || '#ffffff';
        ctx.font = '12px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 30);
      });

      packets.forEach(packet => {
        if (packet.currentIndex < packet.path.length - 1) {
          const fromNode = currentTopology.nodes.find(n => n.id === packet.path[packet.currentIndex]);
          const toNode = currentTopology.nodes.find(n => n.id === packet.path[packet.currentIndex + 1]);

          if (fromNode && toNode) {
            const x = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
            const y = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

            ctx.fillStyle = packet.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = packet.color;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = packet.color;
            ctx.font = 'bold 10px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(packet.type, x, y - 12);
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, currentTopology, packets]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setPackets(prev => {
        const updated = prev.map(packet => {
          const newProgress = packet.progress + (speed[0] / 1000);

          if (newProgress >= 1) {
            if (packet.currentIndex < packet.path.length - 2) {
              return { ...packet, currentIndex: packet.currentIndex + 1, progress: 0 };
            } else {
              setStats(s => ({ ...s, delivered: s.delivered + 1, inTransit: s.inTransit - 1 }));
              return null;
            }
          }

          return { ...packet, progress: newProgress };
        }).filter(Boolean) as Packet[];

        setStats(s => ({ ...s, inTransit: updated.length }));
        return updated;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, speed]);

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      addPacket();
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, topology]);

  const addPacket = () => {
    const types: Array<'TCP' | 'UDP' | 'HTTP' | 'DNS'> = ['TCP', 'UDP', 'HTTP', 'DNS'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const nodes = currentTopology.nodes;
    const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
    const destNode = nodes.filter(n => n.id !== sourceNode.id)[Math.floor(Math.random() * (nodes.length - 1))];

    const path = findPath(sourceNode.id, destNode.id);

    if (path.length > 1) {
      const newPacket: Packet = {
        id: Date.now().toString(),
        type,
        path,
        currentIndex: 0,
        progress: 0,
        color: PACKET_COLORS[type],
      };

      setPackets(prev => [...prev, newPacket]);
      setStats(s => ({ ...s, sent: s.sent + 1, inTransit: s.inTransit + 1 }));
    }
  };

  const findPath = (start: string, end: string): string[] => {
    const visited = new Set<string>();
    const queue: string[][] = [[start]];

    while (queue.length > 0) {
      const path = queue.shift()!;
      const node = path[path.length - 1];

      if (node === end) {
        return path;
      }

      if (!visited.has(node)) {
        visited.add(node);

        const neighbors = currentTopology.edges
          .filter(e => e.from === node || e.to === node)
          .map(e => e.from === node ? e.to : e.from);

        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push([...path, neighbor]);
          }
        }
      }
    }

    return [start];
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTopologyChange = (value: string) => {
    setTopology(value as 'mesh' | 'star' | 'ring');
    setPackets([]);
    setStats({ sent: 0, delivered: 0, inTransit: 0, dropped: 0 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: 'color-mix(in oklch, var(--background) 80%, transparent)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">{heading}</h2>
                <Button size="sm" variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground mb-2 block">{labelTopology}</label>
                  <Select value={topology} onValueChange={handleTopologyChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mesh">Mesh Network</SelectItem>
                      <SelectItem value="star">Star Network</SelectItem>
                      <SelectItem value="ring">Ring Network</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 items-end">
                  <Button
                    variant={isPlaying ? 'default' : 'outline'}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                  <Button variant="outline" onClick={addPacket}>
                    <Plus className="w-4 h-4 mr-2" />
                    Send Packet
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">{labelSpeed}</label>
                <Slider value={speed} onValueChange={setSpeed} min={10} max={100} step={10} />
              </div>

              <canvas
                ref={canvasRef}
                width={600}
                height={450}
                className="w-full border border-border rounded-lg mb-4"
                style={{ backgroundColor: 'var(--card)' }}
              />

              <div className="grid grid-cols-4 gap-4 terminal-font text-sm">
                <div className="p-3 rounded bg-muted/30">
                  <div className="text-muted-foreground">{labelSent}</div>
                  <div className="text-2xl font-bold text-foreground">{stats.sent}</div>
                </div>
                <div className="p-3 rounded bg-muted/30">
                  <div className="text-muted-foreground">{labelInTransit}</div>
                  <div className="text-2xl font-bold text-accent">{stats.inTransit}</div>
                </div>
                <div className="p-3 rounded bg-muted/30">
                  <div className="text-muted-foreground">{labelDelivered}</div>
                  <div className="text-2xl font-bold" style={{ color: '#00ff00' }}>{stats.delivered}</div>
                </div>
                <div className="p-3 rounded bg-muted/30">
                  <div className="text-muted-foreground">{labelDropped}</div>
                  <div className="text-2xl font-bold text-destructive">{stats.dropped}</div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded bg-muted/20 terminal-font text-xs">
                <div className="flex gap-4">
                  <span><span style={{ color: PACKET_COLORS.TCP }}>●</span> TCP</span>
                  <span><span style={{ color: PACKET_COLORS.UDP }}>●</span> UDP</span>
                  <span><span style={{ color: PACKET_COLORS.HTTP }}>●</span> HTTP</span>
                  <span><span style={{ color: PACKET_COLORS.DNS }}>●</span> DNS</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
