import React from 'react';
import { ZoomIn, ZoomOut, Download } from 'lucide-react';

interface PreviewControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownload: () => void;
  totalPages: number;
}

export function PreviewControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onDownload,
  totalPages,
}: PreviewControlsProps) {
  return (
    <div className="flex items-center justify-between bg-card p-2 rounded-t-lg border-b">
      <div className="flex items-center gap-2">
        <button
          onClick={onZoomOut}
          className="p-1 hover:bg-accent rounded-md"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
        <button
          onClick={onZoomIn}
          className="p-1 hover:bg-accent rounded-md"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {totalPages} {totalPages === 1 ? 'page' : 'pages'}
        </span>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span className="text-sm">Download PDF</span>
        </button>
      </div>
    </div>
  );
}