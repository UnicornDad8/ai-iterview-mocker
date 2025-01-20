import { UserButton } from "@clerk/nextjs";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <h2 className="text-gray-500">Create and start your AI Mockup Interview</h2>
      <div className="grid grid-cols-1 my-5 md:grid-cols-3">
        <AddNewInterview />
      </div>
      <InterviewList />
    </div>
  )
}

export default Dashboard;