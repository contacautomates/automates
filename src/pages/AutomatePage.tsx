import React, { useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { Automaton, type State } from '../core/ClosureOperations';
import { getReachableStates, getCoReachableStates, epsilonClosure } from '../core/Operations';
import { customEdgeTypes } from '../components/CustomEdges';

interface AutomatePageProps {
  automaton: Automaton | null;
}

const nodeWidth = 70;
const nodeHeight = 70;

function getLayoutedElements(nodes: Node[], edges: Edge[], direction = 'LR') {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction, ranksep: 100, nodesep: 50 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = direction === 'LR' ? 'left' : 'top' as any;
    node.sourcePosition = direction === 'LR' ? 'right' : 'bottom' as any;
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  return { nodes, edges };
}

export const AutomatePage: React.FC<AutomatePageProps> = ({ automaton }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Node inspection state
  const [selectedNodeData, setSelectedNodeData] = React.useState<{
    state: State;
    isReachable: boolean;
    isCoReachable: boolean;
    epsClosure: string[];
  } | null>(null);

  useEffect(() => {
    if (!automaton) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // Parse states to Nodes
    automaton.states.forEach((state) => {
      const isInitial = automaton.initialStates.has(state);
      const isFinal = automaton.finalStates.has(state);

      let className = 'auto-node';
      if (isInitial) className += ' initial-state';
      if (isFinal) className += ' final-state';

      newNodes.push({
        id: state,
        data: { label: state },
        position: { x: 0, y: 0 },
        className,
      });
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

    // Parse transitions to Edges
    let edgeId = 0;
    automaton.transitions.forEach((targetsMap, source) => {
      targetsMap.forEach((targets, symbol) => {
        if (!symbolColors[symbol]) {
          symbolColors[symbol] = symbol === 'ε' ? '#8b5cf6' : EDGE_COLORS[colorIdx++ % EDGE_COLORS.length];
        }
        const edgeColor = symbolColors[symbol];

        targets.forEach((target) => {
          const label = symbol === 'ε' ? 'ε' : symbol;
          const isSelfLoop = source === target;
          const existing = newEdges.find(e => e.source === source && e.target === target);

          if (existing) {
            existing.data = existing.data || { symbols: [] };
            existing.data.symbols.push({ text: label, color: edgeColor });
            if (symbol === 'ε') existing.animated = true;
          } else {
            newEdges.push({
              id: `e${edgeId++}`,
              source,
              target,
              label,
              animated: symbol === 'ε', // Animate EPSILON transitions!
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: edgeColor,
              },
              type: isSelfLoop ? 'selfloop' : 'curved',
              style: { strokeWidth: 2, stroke: edgeColor },
              data: { symbols: [{ text: label, color: edgeColor }] }
            });
          }
        });
      });
    });

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    setSelectedNodeData(null); // Reset when automaton changes
  }, [automaton, setNodes, setEdges]);

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (!automaton) return;
    const s = node.id as State;

    const reachable = getReachableStates(automaton).has(s);
    const coreachable = getCoReachableStates(automaton).has(s);
    const epsClos = epsilonClosure(automaton, new Set([s]));

    setSelectedNodeData({
      state: s,
      isReachable: reachable,
      isCoReachable: coreachable,
      epsClosure: Array.from(epsClos)
    });
  };

  if (!automaton) {
    return (
      <div className="empty-canvas">
        Générez un automate pour l'afficher ici.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={customEdgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#ccc" gap={20} />
        <Controls />
      </ReactFlow>

      {/* Inspecteur de Nœud superposé */}
      {selectedNodeData && (
        <div className="node-inspector">
          <button className="close-inspector" onClick={() => setSelectedNodeData(null)}>X</button>
          <h4>Analyses de l'état : {selectedNodeData.state}</h4>
          <ul>
            <li><strong>Accessible ?</strong> {selectedNodeData.isReachable ? "Oui " : "Non ❌"}</li>
            <li><strong>Co-Accessible ?</strong> {selectedNodeData.isCoReachable ? "Oui " : "Non ❌"}</li>
            <li><strong>Utile ?</strong> {(selectedNodeData.isReachable && selectedNodeData.isCoReachable) ? "Oui " : "Non ❌"}</li>
            <li>
              <strong>ε-Fermeture :</strong> <br />
              <span className="eps-closure-set">
                {"{"} {selectedNodeData.epsClosure.join(', ')} {"}"}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
