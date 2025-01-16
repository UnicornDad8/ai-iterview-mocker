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

const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
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
      updateUserAnswer();
    }
  }, [userAnswer])

  const startStopRecording = () => {
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

  const updateUserAnswer = async () => {
    console.log(userAnswer);
    /*
    setLoading(true);
    const feedbackPrompt = 
        "Question: " + mockInterviewQuestion[activeQuestionIndex]?.question 
        + "\n" + "User Answer: " + userAnswer + ", depends on question and user answer for given interview question, please give us rating for our answer and feedback as area of improvement if any, in just 3 to 5 lines in JSON format with rating field and feedback field";
      
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace("```json", "").replace("```", "");
      console.log(mockJsonResp);
      const jsonFeedbackResp = JSON.parse(mockJsonResp);
      const resp = await db.insert(userAnswer)
        .values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: jsonFeedbackResp?.feedback,
          rating: jsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        });

      if (resp) {
        toast("User answer recorded successfully!");
      }
      setUserAnswer("");
      setLoading(false);
      */
  }

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center p-5 mt-10 rounded-lg bg-secondary">
      <Image src={"/webcam.png"} alt="webcam" width={200} height={200} className="absolute" />
      <Webcam 
        mirrored={true}
        style={{
          height: 300,
          width: "100%",
          zIndex: 10,
        }}
      />
    </div>
    <Button
      disabled={loading} 
      variant="outline" 
      className="my-10"
      onClick={startStopRecording}
      >{isRecording ? 
        <h2 className="flex items-center gap-2 text-red-600">
          <Mic /> Stop Recording
        </h2> : "Record Answer"
      }</Button>
    </div>
  )
}

export default RecordAnswerSection;