export type NodeType = 'router' | 'switch' | 'server' | 'client';
export type PacketType = 'TCP' | 'UDP' | 'HTTP' | 'DNS';

export interface NetNode {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  label: string;
}

export interface Packet {
  id: string;
  from: string;
  to: string;
  currentX: number;
  currentY: number;
  progress: number;
  type: PacketType;
  color: string;
  finalDest: string;
}
