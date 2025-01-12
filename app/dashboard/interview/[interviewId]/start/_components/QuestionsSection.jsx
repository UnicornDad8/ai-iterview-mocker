import { Lightbulb } from 'lucide-react';
import React from 'react'

const QuestionsSection = ({mockInterviewQuestion, activeQuestionIndex}) => {
  return mockInterviewQuestion && (
    <div className="p-5 border rounded-lg">
     <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => {
        return (
          <div key={index + 1}>
            <h2 className={`p-2 text-xs text-center rounded-full cursor-pointer md:text-sm ${activeQuestionIndex === index ? "bg-primary text-white" : "bg-secondary"}`}>Question #{index + 1}</h2>
          </div>
        )
    })}
    </div>
    <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
    <div className="p-5 mt-10 bg-blue-100 border rounded-lg border-primary">
      <h2 className="flex items-center gap-2 mb-3 text-primary"><Lightbulb /> <strong>Note:</strong></h2>
      <h2 className="text-sm text-blue-900">Click on record answer when you want to answer the question.</h2>
      <h2 className="text-sm text-blue-900">At the end of the interview we will give you the feedback along with the correct answer for each of the questions, so you can compare your answer with the correct answer.</h2>
    </div>
  </div>
  )
}

export default QuestionsSection;