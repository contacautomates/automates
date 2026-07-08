import React from 'react';
import { BaseEdge, EdgeLabelRenderer, type EdgeProps } from 'reactflow';

const NODE_W = 80;
const NODE_H = 80;

export const SelfLoopEdge: React.FC<EdgeProps> = ({
  sourceX, sourceY, label, data, markerEnd, style,
}) => {
  const r = 30; // radius of the loop circle
  const cx = sourceX + NODE_W / 2 + r * 0.3;
  const cy = sourceY - r * 1.6; // loop appears above the node

  // SVG arc trick: draw a nearly complete circle
  const d = `M ${sourceX} ${sourceY - NODE_H / 2}
    C ${sourceX + r} ${sourceY - NODE_H / 2 - r * 2},
      ${sourceX + r * 2} ${sourceY - NODE_H / 2 - r * 2},
      ${sourceX + 1} ${sourceY - NODE_H / 2}`;

  const edgeColor = style?.stroke || 'rgba(99,102,241,0.5)';

  return (
    <>
      <BaseEdge path={d} markerEnd={markerEnd} style={style} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${cx}px, ${cy}px)`,
              background: '#0f172a',
              color: 'white',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              border: `1px solid ${edgeColor}`,
              pointerEvents: 'all',
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: '4px'
            }}
            className="nodrag nopan"
          >
            {data?.symbols ? (
              data.symbols.map((sym: any, idx: number) => (
                <span key={idx} style={{ color: sym.color }}>
                  {sym.text}{idx < data.symbols.length - 1 ? ',' : ''}
                </span>
              ))
            ) : (
              <span style={{ color: 'white' }}>{label as string}</span>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const CurvedEdge: React.FC<EdgeProps> = ({
  sourceX, sourceY, targetX, targetY, label, data, markerEnd, style,
}) => {
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  const mx = (sourceX + targetX) / 2;
  const my = (sourceY + targetY) / 2;
  
  // calculate normal vector
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  
  // offset the control point (curves the edge to avoid overlap)
  const offset = 40; 
  const cx = mx + nx * offset;
  const cy = my + ny * offset;

  const d = `M ${sourceX} ${sourceY} Q ${cx} ${cy} ${targetX} ${targetY}`;

  // calculate label position (quadratic bezier, t=0.5)
  const lx = 0.25 * sourceX + 0.5 * cx + 0.25 * targetX;
  const ly = 0.25 * sourceY + 0.5 * cy + 0.25 * targetY;

  const edgeColor = style?.stroke || 'rgba(99,102,241,0.5)';

  return (
    <>
      <BaseEdge path={d} markerEnd={markerEnd} style={style} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${lx}px, ${ly}px)`,
              background: '#0f172a',
              color: 'white',
              padding: '3px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 700,
              border: `1px solid ${edgeColor}`,
              pointerEvents: 'all',
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: '4px'
            }}
            className="nodrag nopan"
          >
            {data?.symbols ? (
              data.symbols.map((sym: any, idx: number) => (
                <span key={idx} style={{ color: sym.color }}>
                  {sym.text}{idx < data.symbols.length - 1 ? ',' : ''}
                </span>
              ))
            ) : (
              <span style={{ color: 'white' }}>{label as string}</span>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const customEdgeTypes = {
  selfloop: SelfLoopEdge,
  curved: CurvedEdge,
};
