"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, BookOpen } from 'lucide-react';

interface CGPADisplayProps {
  cgpa: number;
  totalCredits: number;
  subjectCount: number;
}

export function CGPADisplay({ cgpa, totalCredits, subjectCount }: CGPADisplayProps) {
  const getGradeColor = (cgpa: number) => {
    if (cgpa >= 9) return "bg-green-500";
    if (cgpa >= 8) return "bg-blue-500";
    if (cgpa >= 7) return "bg-yellow-500";
    if (cgpa >= 6) return "bg-orange-500";
    return "bg-red-500";
  };

  const getPerformanceText = (cgpa: number) => {
    if (cgpa >= 9) return "Outstanding";
    if (cgpa >= 8) return "Excellent";
    if (cgpa >= 7) return "Very Good";
    if (cgpa >= 6) return "Good";
    if (cgpa >= 5) return "Average";
    return "Below Average";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Award className="w-4 h-4" />
            CGPA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold">{cgpa.toFixed(2)}</div>
            <Badge className={`${getGradeColor(cgpa)} text-white`}>
              {getPerformanceText(cgpa)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Out of 10.00
          </p>
        </CardContent>
        <div 
          className={`absolute bottom-0 left-0 h-1 ${getGradeColor(cgpa)}`}
          style={{ width: `${(cgpa / 10) * 100}%` }}
        />
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Total Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalCredits}</div>
          <p className="text-sm text-muted-foreground">
            Credits completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Subjects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{subjectCount}</div>
          <p className="text-sm text-muted-foreground">
            Subjects added
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
