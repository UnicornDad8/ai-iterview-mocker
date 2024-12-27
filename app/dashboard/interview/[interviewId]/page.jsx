"use client";

import { useEffect } from 'react'

const Interview = ({params}) => {
  useEffect(() => {
    console.log(params.interviewId);
  }, []);

  return (
    <div>Interview Id: {params.interviewId}</div>
  )
}

export default Interview;