import React from 'react'

const QuestionsSection = ({mockInterviewQuestion, activeQuestionIndex}) => {
  return (
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
  </div>
  )
}

export default QuestionsSection;