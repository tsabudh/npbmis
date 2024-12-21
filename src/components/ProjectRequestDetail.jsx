import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"; // Import useMutation from TanStack Query
import Button from "./material3/Button";
import { submitProject } from "../apis/submitProject";
import { rejectProject } from "../apis/rejectProject";
import Project from "./Project";
import { useRecoilValue } from "recoil";
import { jwtTokenState, userState } from "../store/states";
import { toast } from "react-toastify";
import { approveProject } from "../apis/approveProject";

function ProjectRequestDetail({ project }) {
  const navigate = useNavigate();
  const jwtToken = useRecoilValue(jwtTokenState);
  const user = useRecoilValue(userState);

  const userRole = user?.role;
  console.log(user);
  const submitMutation = useMutation({
    mutationFn: () => {
      let submitFunction;
      if (userRole === "DATA_APPROVE") {
        submitFunction = approveProject;
      } else if (userRole === "DATA_SUBMIT") {
        submitFunction = submitProject;
      }
      submitFunction({ payload: { project_id: project.project_id }, jwtToken });
    },
    onSuccess: (data) => {
      console.log("Project submission successful:", data);
      navigate("../requests");
    },
    onError: (error) => {
      console.error("Error during project submission:", error);
      // Handle any errors that occur during the mutation (e.g., show an error message)
    },
  });
  const rejectMutation = useMutation({
    mutationFn: rejectProject,
    onSuccess: (data) => {
      console.log("Project submission successful:", data);
      navigate("../requests");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error("Error during project submission:", error);
      // Handle any errors that occur during the mutation (e.g., show an error message)
    },
  });

  // Define the approveProject function
  const handleApproval = () => {
    console.log("Approving project");
    if (project && project.project_id) {
      // Use the mutation to submit the project approval
      submitMutation.mutate({ projectId: project.project_id });
    }
  };

  // Define the rejectProject function
  const handleRejection = () => {
    if (project && project.project_id) {
      console.log("Rejecting project", jwtToken);
      // Use the mutation to submit the project rejection (similar to approveProject)
      rejectMutation.mutate({
        projectId: project.project_id,
        jwtToken: jwtToken,
      });
    }
  };

  return (
    <div>
      <header className="flex px-3 py-3">
        <span
          className="material-symbols-outlined"
          onClick={() => navigate("../requests")}
        >
          arrow_back
        </span>
      </header>
      <main>
        <Project project={project} />
      </main>
      <footer className="p-3 flex justify-end items-center gap-3">
        {userRole === "DATA_PREPARE" ? (
          <Button
            variant="outlined"
            onClick={handleRejection}
            disabled={rejectMutation.isLoading}
          >
            {rejectMutation.isLoading ? "Editing" : "Edit"}
          </Button>
        ) : (
          <div className="">
            <Button
              variant="text"
              onClick={handleRejection}
              disabled={rejectMutation.isLoading}
            >
              {rejectMutation.isLoading ? "Rejecting..." : "Reject"}
            </Button>
            <Button
              variant="outlined"
              onClick={handleApproval}
              disabled={submitMutation.isLoading}
            >
              {userRole === "DATA_APPROVE"
                ? submitMutation.isLoading
                  ? "Approving..."
                  : "Approve"
                : submitMutation.isLoading
                ? "Submitting..."
                : "Submit"}
            </Button>
          </div>
        )}
      </footer>
    </div>
  );
}

export default ProjectRequestDetail;
