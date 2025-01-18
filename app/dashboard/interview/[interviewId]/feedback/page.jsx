"use client";

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  
  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db.select().from(UserAnswer)
      .where(eq(UserAnswer?.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

      console.log(result);
      setFeedbackList(result);
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
      <h2 className="text-xl font-semibold">Here is your interview feedback</h2>
      <h2 className="my-3 text-lg text-primary">Your overall interview rating: <strong>7/10</strong></h2>
    
      <h2 className="text-sm text-gray-500">Find below interview question with correct answer, your answer and feedback for improvement</h2>
    </div>
  )
}

export default Feedback;