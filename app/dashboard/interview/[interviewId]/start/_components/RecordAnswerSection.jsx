"use client";

import { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';
import { toast } from "sonner"
import { chatSession } from '@/utils/GeminiAIModal';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserAnswer } from '@/utils/schema';

const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [interviewStarted, setInterviewStarted] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserAnswer(prevAns => prevAns + result?.transcript)
    ));
  }, [results]);

  useEffect(() => {
    if(!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer])

  const StartStopRecording = () => {
    if(isRecording) {
      stopSpeechToText();

      if(userAnswer?.length < 10) {
        setLoading(false);
        toast("Error while saving your answer, please record again");
        return;
      }
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer, "########");
    setLoading(true);
    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question + "\n" +
      "User Answer:" +
      userAnswer +
      ", Depending on question and user answer for the given interview question " +
      " please give a rating for the answer and feedback as area of improvement if any" +
      " in just 3 to 5 lines in JSON format with rating field and feedback field";
    console.log(
      "🚀 ~ file: RecordAnswerSection.jsx:38 ~ SaveUserAnswer ~ feedbackPrompt:",
      feedbackPrompt
    );
    const result = await chatSession.sendMessage(feedbackPrompt);
    console.log(
      "🚀 ~ file: RecordAnswerSection.jsx:46 ~ SaveUserAnswer ~ result:",
      result
    );
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(
      "🚀 ~ file: RecordAnswerSection.jsx:47 ~ SaveUserAnswer ~ mockJsonResp:",
      mockJsonResp
    );
    const JsonfeedbackResp = JSON.parse(mockJsonResp);
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonfeedbackResp?.feedback,
      rating: JsonfeedbackResp?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };


  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          {interviewStarted ?
           <div id="video-stream">
           <Webcam 
             mirrored={true}
             className="rounded-lg"
           />
           </div>
           :
          <div className="flex flex-col items-center w-full p-5 bg-secondary h-[240px] rounded-lg">
            <Image src={"/webcam.png"} alt="webcam" width={200} height={200} className="absolute" />
          </div>
          }
    </div>
    <Button
      disabled={loading} 
      variant="outline" 
      className="my-10"
      onClick={StartStopRecording}
      >{isRecording ? 
        <h2 className="flex items-center gap-2 text-red-600">
          <Mic /> Stop Recording
        </h2> : "Record Answer"
      }</Button>
    </div>
  )
}

export default RecordAnswerSection;