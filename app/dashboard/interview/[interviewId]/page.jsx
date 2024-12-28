"use client";

import { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from "react-webcam";
import { WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Interview = ({params}) => {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const result = await db.select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    // console.log(result);
    setInterviewData(result[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h2 className="text-2xl font-bold">Let's get started</h2>
      <div className="">
        {webcamEnabled ? 
          <Webcam 
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            mirrored={true}
            style = {{
              height: 300,
              width: 300,
            }}
          /> :
          <div className="flex flex-col items-center">
            <WebcamIcon className="w-full p-20 border rounded-lg my-7 h-72 bg-secondary" />
            <Button onClick={() => setWebcamEnabled(true)}>Enable webcam and microphone</Button>
          </div>
          }
      </div>
    </div>
  )
}

export default Interview;