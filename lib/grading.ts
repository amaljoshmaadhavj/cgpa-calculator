export const gradeToPoints: Record<string, number> = {
  'A+': 10,
  'A': 9,
  'B+': 8,
  'B': 7,
  'C+': 6,
  'C': 5,
  'D': 4,
  'F': 0
};

export const gradeOptions = Object.keys(gradeToPoints);

export function calculateCGPA(subjects: Array<{ credits: number; gradePoint: number }>): number {
  if (subjects.length === 0) return 0;
  
  const totalPoints = subjects.reduce((sum, subject) => sum + (subject.credits * subject.gradePoint), 0);
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  
  return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
}
