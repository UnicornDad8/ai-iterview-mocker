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



const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <div className="p-10 transition-all border rounded-lg cursor-pointer bg-secondary hover:scale-105 hover:shadow-md" onClick={() => setOpenDialog(true)}>
        <h2 className="text-lg font-semibold text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview;