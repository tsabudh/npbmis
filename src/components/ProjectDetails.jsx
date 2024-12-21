import React from "react";
import { useRecoilValue } from "recoil";
import { jwtTokenState } from "../store/states";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Project from "./Project";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "../apis/fetchAllProjects";
import { fetchAProject } from "../apis/fetchAProject";

function ProjectDetails() {
  const jwtToken = useRecoilValue(jwtTokenState);

  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    data: project,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["aProject", jwtToken],
    queryFn: () => fetchAProject({ projectId, jwtToken }),
  });

  if (projectId) {
    if (!project) {
      return <div>Project not found!</div>;
    }

    return <Project project={project} />;
  }

  return <div>Choose a project</div>;
}

export default ProjectDetails;
