"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react' 

const StartInterview = ({params}) => {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();

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
    <div>Start Interview...</div>
  )
}

export default StartInterview;