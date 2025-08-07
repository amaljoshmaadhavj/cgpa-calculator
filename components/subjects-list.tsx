"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, BookOpen } from 'lucide-react';
import type { Subject } from "@/types";

interface SubjectsListProps {
  subjects: Subject[];
  onRemoveSubject: (id: string) => void;
}

export function SubjectsList({ subjects, onRemoveSubject }: SubjectsListProps) {
  if (subjects.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No subjects added yet</p>
          <p className="text-sm text-muted-foreground">Add your first subject to start calculating your CGPA</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Subjects ({subjects.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">{subject.name}</h3>
                  <Badge variant="secondary">
                    {subject.credits} credit{subject.credits !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="outline">
                    {subject.grade} ({subject.gradePoint} pts)
                  </Badge>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveSubject(subject.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
