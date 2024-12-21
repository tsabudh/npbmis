import React from "react";

function Project({ project }) {
  console.log(project);

  if (!project) {
    return <div>Project not found</div>;
  }
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">{project.name}</h2>

      <div className="space-y-3">
        <p>
          <strong className="font-medium text-gray-700">Project ID:</strong>
          {project.project_id}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Nepali Name:</strong>
          {project.nepali_name}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Description:</strong>
          {project.description}
        </p>
        <p>
          <strong className="font-medium text-gray-700">
            Approval Status:
          </strong>
          {project.approval_status}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Status:</strong>
          {project.status}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Sector:</strong>
          {project.sector_name}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Time Period:</strong>
          {project.time_period}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Beneficiaries:</strong>
          {project.beneficiaries}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Objectives:</strong>
          {project.objectives}
        </p>
        <p>
          <strong className="font-medium text-gray-700">
            Expected Outcomes:
          </strong>
          {project.expected_outcomes}
        </p>
        <p>
          <strong className="font-medium text-gray-700">
            Responsible Officer Name:
          </strong>
          {project.responsible_officer_name}
        </p>
        <p>
          <strong className="font-medium text-gray-700">
            Responsible Officer Contact:
          </strong>
          {project.responsible_officer_contact}
        </p>
        <p>
          <strong className="font-medium text-gray-700">
            Responsible Officer Email:
          </strong>
          {project.responsible_officer_email}
        </p>
        <p>
          <strong className="font-medium text-gray-700">
            Implementation Method:
          </strong>
          {project.implementation_method}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Prepared By:</strong>

          <div className="flex gap-1 flex-col">
            <p className="flex gap-1">
              <span>User Id:</span>
              <span> {project.prepared_by}</span>
            </p>
            <p className="flex gap-1">
              <span>Name:</span>
              <span> {project.prepared_by_name}</span>
            </p>
          </div>
        </p>

        <p>
          <strong className="font-medium text-gray-700">Requested By:</strong>
          {project.requested_by}
        </p>
        <p>
          <strong className="font-medium text-gray-700">SDG Code:</strong>
          {project.sdg_code}
        </p>
        <p>
          <strong className="font-medium text-gray-700">SDG Name:</strong>
          {project.sdg_name}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Priority Code:</strong>
          {project.priority_code}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Project Nature:</strong>
          {project.project_nature}
        </p>
        <p>
          <strong className="font-medium text-gray-700">
            Inception Status:
          </strong>
          {project.inception_status}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Priority:</strong>
          {project.priority}
        </p>
        <p>
          <strong className="font-medium text-gray-700">Budget Code:</strong>
          {project.budget_code}
        </p>
      </div>
    </div>
  );
}

export default Project;
