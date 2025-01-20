import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  }

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  } 

  return (
    <div className="p-3 border rounded-lg shadow-sm">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">{interview?.jobExperience} Years of Experience</h2>
      <h2 className="text-xs text-gray-400">Created at: {interview?.createdAt}</h2>
      <div className="flex justify-between gap-3 mt-2">
        <Button size="sm" variant="outline" className="w-full"
          onClick = {onFeedbackPress}
        >Feedback</Button>
        <Button size="sm" className="w-full"
          onClick = {onStart}
        >Start</Button>
      </div>
    </div> 
  )
}

export default InterviewItemCard;