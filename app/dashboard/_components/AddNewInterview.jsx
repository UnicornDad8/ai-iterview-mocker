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



const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <div className="p-10 transition-all border rounded-lg cursor-pointer bg-secondary hover:scale-105 hover:shadow-md" onClick={() => setOpenDialog(true)}>
        <h2 className="text-lg font-semibold text-center">+ Add New</h2>
      </div>
      <Dialog className="focus:outline-none ring-0 focus:ring-0" open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Tell us more about your job interview</DialogTitle>
            <div>
              <h2>Add details about your job position or role, job description and years of experience</h2>
              <div className="my-2 mt-7">
                <label>Job Role/Job Position</label>
                <Input placeholder="Ex. Full-Stack Developer" />
              </div>
            </div>
            <div className="flex justify-end gap-5 mt-10">
                <Button className="outline-none" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button>Start Interview</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview;