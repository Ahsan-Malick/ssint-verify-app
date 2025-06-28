"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from ".../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge";
import { Label } from "../../../../components/ui/label";
import { Separator } from ".../../../components/ui/separator";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import getGradeColor from "../../utils/getGradeColor";

interface GradeBreakdown {
  frontGrade: number;
  backGrade: number;
  frontRatio: number;
  backRatio: number;
}

export default function CenteringGrade({
  gradeBreakdown,
}: {
  gradeBreakdown: GradeBreakdown;
}) {
  return (
    <Card id="grade-breakdown">
      <CardHeader>
        <CardTitle>Centering Grade Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Front & Back Grades</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Front Grade</span>
                <Badge className={getGradeColor(gradeBreakdown.frontGrade)}>
                  {gradeBreakdown.frontGrade}
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Back Grade</span>
                <Badge className={getGradeColor(gradeBreakdown.backGrade)}>
                  {gradeBreakdown.backGrade}
                </Badge>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Grading Ratios</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Front Weight</span>
                <span className="font-mono">
                  {(gradeBreakdown.frontRatio * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Back Weight</span>
                <span className="font-mono">
                  {(gradeBreakdown.backRatio * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
