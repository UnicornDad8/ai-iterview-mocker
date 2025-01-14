"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react' 
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

const StartInterview = ({params}) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    // console.log(result);
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
  
    setMockInterviewQuestion(jsonMockResp);
    console.log(jsonMockResp);
    setInterviewData(result[0]);
  };

  return (
    <div className="my-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Questions */}
        <QuestionsSection 
          mockInterviewQuestion={mockInterviewQuestion} 
          activeQuestionIndex={activeQuestionIndex}  
        />

        {/* Video / Audio Recording */}
        <RecordAnswerSection 
           mockInterviewQuestion={mockInterviewQuestion} 
           activeQuestionIndex={activeQuestionIndex}  
        />
      </div>
    </div>
  )
}

export default StartInterview;