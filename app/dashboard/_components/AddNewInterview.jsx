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



const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <div className="p-10 transition-all border rounded-lg cursor-pointer bg-secondary hover:scale-105 hover:shadow-md" onClick={() => setOpenDialog(true)}>
        <h2 className="text-lg font-semibold text-center">+ Add New</h2>
      </div>
      <Dialog className="focus:outline-none ring-0 focus:ring-0" open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers. 
            </DialogDescription>
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