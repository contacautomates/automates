import React, { useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType,
  type Node, 
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Automaton, EPSILON } from '../core/ClosureOperations';
import dagre from 'dagre';
import { customEdgeTypes } from './CustomEdges';

interface AutomatonViewerProps {
  automaton: Automaton | null;
}

const NODE_W = 80;
const NODE_H = 80;

const layoutGraph = new dagre.graphlib.Graph();
layoutGraph.setDefaultEdgeLabel(() => ({}));

// Removed inline SelfLoopEdge, now imported from CustomEdges

// ─── Layout ─────────────────────────────────────────────────────────────────
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  layoutGraph.setGraph({ rankdir: 'LR', ranksep: 90, nodesep: 70 });
  nodes.forEach((n) => layoutGraph.setNode(n.id, { width: NODE_W, height: NODE_H }));
  // Don't add self-loop edges to dagre (they confuse layout)
  edges.filter(e => e.source !== e.target).forEach((e) => layoutGraph.setEdge(e.source, e.target));
  dagre.layout(layoutGraph);
  nodes.forEach((node) => {
    const pos = layoutGraph.node(node.id);
    node.position = { x: pos.x - NODE_W / 2, y: pos.y - NODE_H / 2 };
  });
  return { nodes, edges };
};

// ─── Main Component ──────────────────────────────────────────────────────────
export const AutomatonViewer: React.FC<AutomatonViewerProps> = ({ automaton }) => {
  const { nodes, edges } = useMemo(() => {
    if (!automaton) return { nodes: [], edges: [] };

    const initialNodes: Node[] = Array.from(automaton.states).map((state) => {
      const isInitial = automaton.initialStates.has(state);
      const isFinal = automaton.finalStates.has(state);

      let background = 'var(--bg-card)';
      let border = '2px solid var(--border)';
      let boxShadow = 'none';
      let color = 'var(--text-main)';

      if (isInitial && isFinal) {
        background = 'rgba(16, 185, 129, 0.25)'; border = '3px solid #10b981';
        boxShadow = '0 0 0 5px rgba(16,185,129,0.35), 0 0 0 8px rgba(16,185,129,0.12)';
        color = '#10b981';
      } else if (isInitial) {
        background = 'rgba(99, 102, 241, 0.3)'; border = '3px solid #6366f1';
        boxShadow = '0 0 0 5px rgba(99,102,241,0.25)'; color = 'var(--primary)';
      } else if (isFinal) {
        background = 'rgba(245, 158, 11, 0.1)'; border = '3px solid #f59e0b';
        boxShadow = '0 0 0 5px rgba(245,158,11,0.3), 0 0 0 9px rgba(245,158,11,0.1)';
        color = '#f59e0b';
      }

      return {
        id: state,
        data: {
          label: (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px', lineHeight: 1.1 }}>
              {isInitial && <span style={{ fontSize: '9px', letterSpacing: '1px', opacity: 0.85, fontWeight: 700 }}>▶ INIT</span>}
              {state.split('\n').map((line, idx) => (
                <span key={idx} style={{ 
                  fontSize: idx === 0 ? '14px' : '10px', 
                  fontWeight: idx === 0 ? 900 : 500,
                  opacity: idx === 0 ? 1 : 0.8,
                  textAlign: 'center'
                }}>
                  {line}
                </span>
              ))}
              {isFinal && <span style={{ fontSize: '9px', letterSpacing: '1px', opacity: 0.85, fontWeight: 700 }}>◎ FIN</span>}
            </div>
          )
        },
        position: { x: 0, y: 0 },
        style: {
          background, border, boxShadow, color,
          borderRadius: '50%', width: NODE_W, height: NODE_H,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', transition: 'all 0.2s'
        }
      };
    });

    const EDGE_COLORS = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
      '#ec4899', '#14b8a6', '#f43f5e', '#6366f1', '#a855f7',
      '#84cc16', '#06b6d4', '#d946ef', '#eab308', '#f97316',
      '#22c55e', '#0ea5e9', '#64748b', '#71717a', '#a3e635',
      '#34d399', '#f87171', '#fbbf24', '#818cf8', '#e879f9'
    ];
    const symbolColors: Record<string, string> = {};
    let colorIdx = 0;

    const initialEdges: Edge[] = [];
    let edgeId = 0;

    automaton.transitions.forEach((symbolsMap, source) => {
      symbolsMap.forEach((targets, symbol) => {
        if (!symbolColors[symbol]) {
          symbolColors[symbol] = symbol === EPSILON ? '#8b5cf6' : EDGE_COLORS[colorIdx++ % EDGE_COLORS.length];
        }
        const edgeColor = symbolColors[symbol];

        targets.forEach((target) => {
          const label = symbol === EPSILON ? 'ε' : symbol;
          const isSelfLoop = source === target;
          const existing = initialEdges.find(e => e.source === source && e.target === target);

          if (existing) {
            existing.data = existing.data || { symbols: [] };
            existing.data.symbols.push({ text: label, color: edgeColor });
          } else {
            initialEdges.push({
              id: `e${edgeId++}`,
              source, target, label,
              type: isSelfLoop ? 'selfloop' : 'curved',
              animated: symbol === EPSILON,
              markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor },
              style: { stroke: edgeColor, strokeWidth: 1.5 },
              data: { symbols: [{ text: label, color: edgeColor }] }
            });
          }
        });
      });
    });

    return getLayoutedElements(initialNodes, initialEdges);
  }, [automaton]);

  return (
    <div>
      <div style={{ height: '480px', width: '100%', background: 'var(--bg-dark)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <ReactFlow nodes={nodes} edges={edges} edgeTypes={customEdgeTypes} fitView>
          <Background color="#1e293b" gap={24} />
          <Controls />
        </ReactFlow>
      </div>

      {/* LEGEND */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px', padding: '10px 20px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        {[
          { bg: 'rgba(99,102,241,0.3)', border: '#6366f1', shadow: '0 0 0 5px rgba(99,102,241,0.25)', label: 'État Initial' },
          { bg: 'rgba(245,158,11,0.1)', border: '#f59e0b', shadow: '0 0 0 5px rgba(245,158,11,0.3)', label: 'État Final' },
          { bg: 'rgba(16,185,129,0.25)', border: '#10b981', shadow: '0 0 0 5px rgba(16,185,129,0.35)', label: 'Initial + Final' },
          { bg: 'var(--bg-card)', border: 'var(--border)', shadow: 'none', label: 'État Standard' },
        ].map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: item.bg, border: `2px solid ${item.border}`, boxShadow: item.shadow, flexShrink: 0 }}></div>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};
