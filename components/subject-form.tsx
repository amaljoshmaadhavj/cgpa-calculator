"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from 'lucide-react';
import { gradeOptions, gradeToPoints } from "@/lib/grading";
import type { Subject } from "@/types";

interface SubjectFormProps {
  onAddSubject: (subject: Omit<Subject, 'id'>) => void;
}

export function SubjectForm({ onAddSubject }: SubjectFormProps) {
  const [subjectName, setSubjectName] = useState("");
  const [credits, setCredits] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subjectName || !credits || !grade) return;
    
    const newSubject = {
      name: subjectName,
      credits: Number(credits),
      grade,
      gradePoint: gradeToPoints[grade]
    };
    
    onAddSubject(newSubject);
    
    // Reset form
    setSubjectName("");
    setCredits("");
    setGrade("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Subject
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject-name">Subject Name</Label>
              <Input
                id="subject-name"
                placeholder="e.g., Mathematics"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                type="number"
                min="1"
                max="10"
                placeholder="e.g., 3"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={grade} onValueChange={setGrade} required>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((gradeOption) => (
                    <SelectItem key={gradeOption} value={gradeOption}>
                      {gradeOption} ({gradeToPoints[gradeOption]} points)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Add Subject
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
