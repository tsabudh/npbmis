import React, { useContext, useEffect, useState } from "react";
import getAllProjects from "../apis/getAllProjects";
import AuthContext from "../context/AuthContext";
import ProjectCardSimple from "./ProjectCardSimple";

function ProjectsOverview() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { jwtToken } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the list of projects from the API
    const fetchProjects = async () => {
      try {
        const responseObject = await getAllProjects(jwtToken);

        if (!responseObject) {
          throw new Error(responseObject.message || "Failed to fetch projects");
        }

        setProjects(responseObject.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [jwtToken]);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h2>Projects Overview</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={project.id + index}>
            <ProjectCardSimple
              name={project.name}
              nepaliName={project.nepali_name}
              status={project.status}
              description={project.description}
              sector={project.sector}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsOverview;
