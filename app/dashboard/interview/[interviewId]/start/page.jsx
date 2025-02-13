"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react' 
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
        <QuestionsSection 
          mockInterviewQuestion={mockInterviewQuestion} 
          activeQuestionIndex={activeQuestionIndex}  
        />
        <RecordAnswerSection 
           mockInterviewQuestion={mockInterviewQuestion} 
           activeQuestionIndex={activeQuestionIndex}
           interviewData={interviewData}  
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && 
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && 
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && 
          <Link href="feedback">
            <Button>End Interview</Button>
          </Link>
        }
      </div>
    </div>
  )
}

export default StartInterview;