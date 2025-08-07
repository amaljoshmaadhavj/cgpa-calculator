export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
  gradePoint: number;
}

export interface StudentRecord {
  id?: string;
  userId: string; // Add this field
  studentName: string;
  subjects: Subject[];
  cgpa: number;
  totalCredits: number;
  createdAt: Date;
  updatedAt: Date;
}
