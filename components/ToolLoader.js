'use client';
import { ToolComponents } from './ToolRegistry';

export default function ToolLoader({ toolId }) {
  const ActiveToolComponent = ToolComponents[toolId];
  if (!ActiveToolComponent) return <p className="text-center p-20">Tool initializing...</p>;
  return <ActiveToolComponent />;
}
