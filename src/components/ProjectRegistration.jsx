import React, { useContext, useEffect, useState } from "react";

import classNames from "classnames/bind";
import Nepali from "nepalify-react";
import styles from "./ProjectRegistration.module.scss";
import Button from "./Button";
import addProjects from "../apis/addProject";
import AuthContext from "../context/AuthContext";
const cx = classNames.bind(styles);

function ProjectRegistration() {
  const [projectName, setProjectName] = useState("");
  const [projectNameNepali, setProjectNameNepali] = useState("");
  const [projectBudgetCode, setProjectBudgetCode] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectBudgetStatus, setProjectBudgetStatus] = useState("");
  const [projectSector, setProjectSector] = useState("");

  const { jwtToken } = useContext(AuthContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let form = e.target;

    const formData = new FormData(form);

    // Create a plain object from FormData
    const projectData = {
      name: formData.get("projectName"),
      nepaliName: formData.get("projectNameNepali"),
      budgetCode: formData.get("projectBudgetCode"),
      status: formData.get("status"),
      budgetStatus: formData.get("budgetStatus"),
      sector: formData.get("sector"),
    };

    console.log(projectData);
    const results = await addProjects(projectData, jwtToken);
    console.log(results);
  };

  return (
    <section className={cx("project-registration")}>
      <header className={cx("header")}>
        <h2 className={cx("h2")}>Add a new project</h2>
      </header>
      <div className={cx("form-container")}>
        <form
          id="project-registration-form"
          onSubmit={handleFormSubmit}
          className={cx("form")}
        >
          <div className={cx("text-fields")}>
            <div className={cx("input-field")}>
              <label htmlFor="projectName" className={cx("label")}>
                Project Name (English)
              </label>

              <input
                type="text"
                id="projectName"
                name="projectName"
                className={cx("input")}
                placeholder="Project Name (English)"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
              />
            </div>
            <div className={cx("input-field")}>
              <label htmlFor="projectNameNepali" className={cx("label")}>
                Project Name (Nepali)
              </label>
              <Nepali
                placeholder="परियोजना नाम (नेपाली)"
                funcname="unicodify"
                inputType="text"
                initialValue=""
                className={cx("input")}
                id="projectNameNepali"
                name="projectNameNepali"
                onChange={(e) => setProjectNameNepali(e.target.value)}
                value={projectNameNepali}
              />
              
            </div>
            <div className={cx("input-field")}>
              <label htmlFor="projectBudgetCode" className={cx("label")}>
                Project&apos;s Budget Code
              </label>
              <input
                type="text"
                id="projectBudgetCode"
                name="projectBudgetCode"
                className={cx("input")}
                placeholder="Eg: 124"
                onChange={(e) => setProjectBudgetCode(e.target.value)}
                value={projectBudgetCode}
              />
            </div>
          </div>

          <div className={cx("radio-fields")}>
            <fieldset className={cx("input-field")}>
              <legend className={cx("title")}>Project&apos;s Status</legend>

              <div className={cx("input-label-wrapper")}>
                <input
                  id="project-status-radio-new"
                  type="radio"
                  className={cx("input-radio")}
                  value="NEW_OR_UPCOMING"
                  name="status"
                  onChange={(e) => setProjectStatus(e.target.value)}
                  checked={projectStatus === "NEW_OR_UPCOMING"}
                />
                <label
                  htmlFor="project-status-radio-new"
                  className={cx("label")}
                >
                  New or Upcoming
                </label>
              </div>

              <div className={cx("input-label-wrapper")}>
                <input
                  id="project-status-radio-ongoing"
                  type="radio"
                  className={cx("input-radio")}
                  value="ONGOING"
                  name="status"
                  onChange={(e) => setProjectStatus(e.target.value)}
                  checked={projectStatus === "ONGOING"}
                />
                <label
                  htmlFor="project-status-radio-ongoing"
                  className={cx("label")}
                >
                  Ongoing
                </label>
              </div>
            </fieldset>
            <fieldset className={cx("input-field")}>
              <legend className={cx("title")}>
                Project&apos;s Budget Status
              </legend>

              <div className={cx("input-label-wrapper")}>
                <input
                  id="project-budget-status-radio-new"
                  type="radio"
                  className={cx("input-radio")}
                  value="IDENTIFICATION"
                  name="budgetStatus"
                  onChange={(e) => setProjectBudgetStatus(e.target.value)}
                  checked={projectBudgetStatus === "IDENTIFICATION"}
                />
                <label
                  htmlFor="project-budget-status-radio-new"
                  className={cx("label")}
                >
                  Identification
                </label>
              </div>

              <div className={cx("input-label-wrapper")}>
                <input
                  id="project-budget-status-radio-ongoing"
                  type="radio"
                  className={cx("input-radio")}
                  value="EVALUATION"
                  name="budgetStatus"
                  onChange={(e) => setProjectBudgetStatus(e.target.value)}
                  checked={projectBudgetStatus === "EVALUATION"}
                />
                <label
                  htmlFor="project-budget-status-radio-ongoing"
                  className={cx("label")}
                >
                  Evaluation
                </label>
              </div>
            </fieldset>
            <fieldset className={cx("input-field")}>
              <legend className={cx("title")}>
                Project&apos;s Area / Sector
              </legend>

              <div className={cx("input-label-wrapper")}>
                <input
                  id="project-sector-radio-infra"
                  type="radio"
                  className={cx("input-radio")}
                  value="INFRASTRUCTURE"
                  name="sector"
                  onChange={(e) => setProjectSector(e.target.value)}
                  checked={projectSector === "INFRASTRUCTURE"}
                />
                <label
                  htmlFor="project-sector-radio-infra"
                  className={cx("label")}
                >
                  Infrastructure
                </label>
              </div>

              <div className={cx("input-label-wrapper")}>
                <input
                  id="project-budget-status-radio-service"
                  type="radio"
                  className={cx("input-radio")}
                  value="SOCIAL_OR_SERVICE"
                  name="sector"
                  onChange={(e) => setProjectSector(e.target.value)}
                />
                <label
                  htmlFor="project-budget-status-radio-service"
                  className={cx("label")}
                >
                  Social / Service
                </label>
              </div>
            </fieldset>
          </div>

          <footer className={cx("footer")}>
            <Button className={"small small-padding primary"}>
              Create new project
            </Button>
          </footer>
        </form>
      </div>
    </section>
  );
}

export default ProjectRegistration;
