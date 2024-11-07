import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import classNames from "classnames/bind";

import AuthContext from "../context/AuthContext";
import styles from "./ProjectsOverview.module.scss";

import getAllProjects from "../apis/getAllProjects";
import ProjectCardSimple from "./ProjectCardSimple";
import LoaderSpinner from "./LoaderSpinner";

const cx = classNames.bind(styles);

function ProjectsOverview() {
  // const [projects, setProjects] = useState([]);
  const { jwtToken } = useContext(AuthContext);

  const { data: projects, status } = useQuery({
    queryKey: ["getAllUsers", jwtToken],
    queryFn: () => getAllProjects(jwtToken),
    select: (data) => data.data,
    enabled: !!jwtToken, // Only run the query if jwtToken exists
  });

  console.log(projects);

  return (
    <div className={cx("projects-overview")}>
      <div className={cx("header")}>
        <h2 className={cx("h2")}>Projects Overview</h2>
      </div>
      <ul className={cx("container")}>
        {<LoaderSpinner state={status} hideAfter={true} />}
        {projects?.map((project, index) => (
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
