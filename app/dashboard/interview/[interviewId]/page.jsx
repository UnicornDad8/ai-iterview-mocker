"use client";

import { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from "react-webcam";
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Interview = ({params}) => {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    // console.log(params.interviewId);
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
    <div className="flex flex-col justify-center my-10">
      <h2 className="mb-10 text-2xl font-bold">Let's get started</h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 p-5 border rounded-lg">
          <h2 className="text-lg"><strong>Job Role/Job Position:</strong> {interviewData?.jobPosition}</h2>
          <h2 className="text-lg"><strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc}</h2>
          <h2 className="text-lg"><strong>Years of Experience:</strong> {interviewData?.jobExperience}</h2>
        </div>
        <div className="p-5 bg-yellow-100 border border-yellow-300 rounded-lg">
          <h2 className="flex items-center gap-2 text-yellow-500"><Lightbulb /> <strong>Information</strong></h2>
          <h2 className="mt-3 text-sm text-yellow-700">
          Enable video webcam and microphone to start your AI Generated Mock 
          Interview, it has 5 questions which you can answer and at the last 
          you will get the report based on your answers. 
          <br></br>
          <br></br>
          <strong className="mr-1 text-yellow-500">NOTE:</strong>
          <span className="text-sm text-yellow-500">
          we never 
          record your video, you can disable webcam access at any time you 
          want.
          </span>
          </h2>
        </div>
      </div>

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
            <WebcamIcon className="w-full p-20 border rounded-lg h-72 bg-secondary" />
            <Button variant="ghost" className="w-full my-3" onClick={() => setWebcamEnabled(true)}>Enable webcam and microphone</Button>
          </div>
          }
      </div>
      </div>
      <div className="flex items-end justify-end mt-5">
        <Link href={`${params.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview;