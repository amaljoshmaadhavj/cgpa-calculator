"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Download } from 'lucide-react';

interface DataActionsProps {
  onSave: () => void;
  onLoad: () => void;
  isSaving: boolean;
  isLoading: boolean;
}

export function DataActions({ onSave, onLoad, isSaving, isLoading }: DataActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button 
            onClick={onSave} 
            disabled={isSaving}
            className="flex-1 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save to Cloud"}
          </Button>
          <Button 
            variant="outline" 
            onClick={onLoad}
            disabled={isLoading}
            className="flex-1 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isLoading ? "Loading..." : "Load from Cloud"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
