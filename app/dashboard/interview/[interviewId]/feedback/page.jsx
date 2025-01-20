"use client";

import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();
  
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

  const CalculateRating = () => {
    let ratingSum = 0;
    let averageRating = 0;

    if(feedbackList) {
      for(let i = 0; i < feedbackList.length; i++) {
        ratingSum += Number(feedbackList[i].rating);
      }

      averageRating = Math.round(ratingSum / feedbackList.length);

      if(averageRating < 5) {
        return (
          <h2 className="my-3 text-lg text-red-500">Your overall interview rating:{" "}
            <strong>{averageRating}/10</strong>
          </h2>
        )
      } else {
        return (
          <h2 className="my-3 text-lg text-primary">Your overall interview rating:{" "} 
            <strong>{averageRating}/10</strong>
          </h2>
        )
      }     
    }
  }

  return (
    <div className="p-10">
     
      {feedbackList?.length == 0 ?
        <h2 className="text-xl font-bold text-gray-500">No Interview Feedback Record found</h2>
        : 
        <>
         <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
         <h2 className="text-xl font-semibold">Here is your interview feedback</h2>
          {CalculateRating()}
          <h2 className="text-sm text-gray-500">Find below interview question with correct answer, your answer and feedback for improvement</h2>
          <div>
            {feedbackList && feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="flex items-center justify-between w-full gap-10 p-2 my-2 text-left rounded-lg bg-secondary">
                {item?.question}
                <ChevronsUpDown className="w-5 h-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="p-2 text-red-500 border rounded-lg"><strong>Rating:</strong> {item.rating}</h2>
                <h2 className="p-2 text-sm text-red-900 bg-red-100 border rounded-lg"><strong>Your answer:</strong> {item.userAns}</h2>
                <h2 className="p-2 text-sm text-green-900 bg-green-100 border rounded-lg"><strong>Correct answer example according to AI:</strong> {item.correctAns}</h2>
                <h2 className="p-2 text-sm bg-blue-100 border rounded-lg text-primary"><strong>Feedback:</strong> {item.feedback}</h2>
              </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        </>
      } 
      <Button onClick={() => router.replace("/dashboard")} className="mt-3">Go Home</Button>
    </div>
  )
}

export default Feedback;