"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";



const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
  {
    "question": "Your question here",
    "answer": "Your answer here"
  }`;
  const result = await chatSession.sendMessage(inputPrompt);
  const MockJsonResponse = (result.response.text()).replace("```json", "").replace("```", ""); 
  console.log(JSON.parse(MockJsonResponse));
  setLoading(false);
  };


  return (
    <div>
      <div className="p-10 transition-all border rounded-lg cursor-pointer bg-secondary hover:scale-105 hover:shadow-md" onClick={() => setOpenDialog(true)}>
        <h2 className="text-lg font-semibold text-center">+ Add New</h2>
      </div>
      <Dialog className="focus:outline-none ring-0 focus:ring-0" open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Tell us more about your job interview</DialogTitle>
            <form onSubmit={onSubmit}>
            <div>
              <h2>Add details about your job position or role, job description and years of experience</h2>
              <div className="my-3 mt-7">
                <label>Job Role/Job Position</label>
                <Input 
                  placeholder="Ex. Full-Stack Developer" 
                  required 
                  onChange={(event) => setJobPosition(event.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Job Description/Tech Stack</label>
                <Textarea 
                  placeholder="Ex. React, Angular, NodeJs, MySql, etc" 
                  required 
                  onChange={(event) => setJobDescription(event.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Years of experience</label>
                <Input 
                  placeholder="Ex. 5" 
                  type="number" 
                  max="50" 
                  required
                  onChange={(event) => setJobExperience(event.target.value)} 
                />
              </div>
            </div>
            <div className="flex justify-end gap-5 mt-10">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Generating from AI
                    </>
                  ) : (
                    'Start Interview'
                  )}
                </Button>
            </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview;