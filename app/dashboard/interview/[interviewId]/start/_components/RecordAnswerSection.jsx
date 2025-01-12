import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'
import Webcam from 'react-webcam';

const RecordAnswerSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center p-5 mt-10 rounded-lg bg-secondary">
      <Image src={"/webcam.png"} width={200} height={200} className="absolute" />
      <Webcam 
        mirrored={true}
        style={{
          height: 300,
          width: "100%",
          zIndex: 10,
        }}
      />
    </div>
    <Button variant="outline" className="my-10">Record Answer</Button>
    </div>
  )
}

export default RecordAnswerSection;