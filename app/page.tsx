"use client";

import { useState, useEffect } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { AuthForm } from "@/components/auth/auth-form";
import { ProfilePage } from "@/components/profile/profile-page";
import { Navbar } from "@/components/layout/navbar";
import { calculateCGPA } from "@/lib/grading";
import { SubjectForm } from "@/components/subject-form";
import { SubjectsList } from "@/components/subjects-list";
import { CGPADisplay } from "@/components/cgpa-display";
import { DataActions } from "@/components/student-form";
import { useToast } from "@/hooks/use-toast";
import { Calculator, GraduationCap } from 'lucide-react';
import type { Subject, StudentRecord } from "@/types";

type View = 'calculator' | 'profile';

function CGPACalculatorContent() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<View>('calculator');
  const { user } = useAuth();
  const { toast } = useToast();

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      loadFromFirebase();
    }
  }, [user]);

  const addSubject = (subjectData: Omit<Subject, 'id'>) => {
    const newSubject: Subject = {
      ...subjectData,
      id: Date.now().toString()
    };
    setSubjects(prev => [...prev, newSubject]);
  };

  const removeSubject = (id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };

  const cgpa = calculateCGPA(subjects);
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

  const saveToFirebase = async () => {
    if (!user) return;

    setIsSaving(true);
    try {
      const studentRecord: StudentRecord = {
        userId: user.uid,
        studentName: user.displayName || user.email || "Unknown",
        subjects,
        cgpa,
        totalCredits,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = doc(db, "student-records", user.uid);
      await setDoc(docRef, studentRecord);

      toast({
        title: "Success",
        description: "Your CGPA data has been saved to the cloud!",
      });
    } catch (error) {
      console.error("Error saving to Firebase:", error);
      toast({
        title: "Error",
        description: "Failed to save data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const loadFromFirebase = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const docRef = doc(db, "student-records", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as StudentRecord;
        setSubjects(data.subjects || []);
        toast({
          title: "Success",
          description: "Your CGPA data has been loaded from the cloud!",
        });
      } else {
        // No existing data, which is fine for new users
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error loading from Firebase:", error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (currentView === 'profile') {
    return <ProfilePage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar onProfileClick={() => setCurrentView('profile')} />
      
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">CGPA Calculator</h1>
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome back, {user?.displayName || user?.email}! Calculate your Cumulative Grade Point Average with ease.
          </p>
        </div>

        {/* Data Actions */}
        <DataActions
          onSave={saveToFirebase}
          onLoad={loadFromFirebase}
          isSaving={isSaving}
          isLoading={isLoading}
        />

        {/* CGPA Display */}
        <CGPADisplay 
          cgpa={cgpa} 
          totalCredits={totalCredits} 
          subjectCount={subjects.length} 
        />

        {/* Subject Form */}
        <SubjectForm onAddSubject={addSubject} />

        {/* Subjects List */}
        <SubjectsList subjects={subjects} onRemoveSubject={removeSubject} />
      </div>
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return <CGPACalculatorContent />;
}
