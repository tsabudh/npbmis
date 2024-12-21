import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Nepali from "nepalify-react";
import Button from "./material3/Button";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { jwtTokenState, sectorsState } from "../store/states";

const ProjectRegisterTab = () => {
  const jwtToken = useRecoilValue(jwtTokenState);
  const sectors = useRecoilValue(sectorsState);
  console.log(sectors);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Mutation for submitting the form
  const mutation = useMutation({
    mutationFn: (projectData) => {
      const token = jwtToken;
      return axios.post("http://localhost:3000/api/v1/projects", projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const nepaliName = watch("nepali_name", "");

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      console.log("Data:", data);
      await mutation.mutateAsync(data);
      toast.success("Project successfully registered!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Error adding project!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="max-w-4xl  p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex justify-start items-center gap-4">
          {/* Project Name */}
          <div className="basis-1/2">
            <label className="block font-medium">Project Name</label>
            <input
              type="text"
              {...register("name", { required: "Project name is required" })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <p className="text-error text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Nepali Name */}
          <div className="basis-1/2">
            <label className="block font-medium">Nepali Name</label>
            <Nepali
              placeholder="परियोजना नाम (नेपाली)"
              funcname="unicodify"
              inputType="text"
              initialValue={nepaliName}
              className="w-full border border-gray-300 rounded-md p-2"
              id="projectNameNepali"
              name="nepali_name"
              onChange={(value) =>
                setValue("nepali_name", value, { shouldValidate: true })
              }
            />
            {errors.nepali_name && (
              <p className="text-error text-sm">{errors.nepali_name.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Status</option>
            <option value="NEW_OR_UPCOMING">New or Upcoming</option>
            <option value="ONGOING">Ongoing</option>
          </select>
          {errors.status && (
            <p className="text-error text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Sector */}
        <div>
          <label className="block font-medium">Sector</label>
          <select
            {...register("sector_id", { required: "Sector is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Sector</option>
            {/* Map over sectors and create options dynamically */}
            {sectors?.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
          {errors.sector && (
            <p className="text-error text-sm">{errors.sector.message}</p>
          )}
        </div>

        {/* Implementation Area */}
        <div>
          <label className="block font-medium">Implementation Area</label>
          <input
            type="text"
            {...register("implementation_area", {
              required: "Implementation area is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.implementation_area && (
            <p className="text-error text-sm">
              {errors.implementation_area.message}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Budget Total Cost */}
          <div>
            <label className="block font-medium">Budget Total Cost</label>
            <input
              type="number"
              {...register("budget_total_cost", {
                required: "Budget total cost is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.budget_total_cost && (
              <p className="text-error text-sm">
                {errors.budget_total_cost.message}
              </p>
            )}
          </div>

          {/* Budget Annual Allocation */}
          <div>
            <label className="block font-medium">
              Budget Annual Allocation
            </label>
            <input
              type="number"
              {...register("budget_annual_allocation", {
                required: "Annual allocation is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.budget_annual_allocation && (
              <p className="text-error text-sm">
                {errors.budget_annual_allocation.message}
              </p>
            )}
          </div>

          {/* Time Period */}
          <div>
            <label className="block font-medium">Time Period</label>
            <input
              type="text"
              {...register("time_period", {
                required: "Time period is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.time_period && (
              <p className="text-error text-sm">{errors.time_period.message}</p>
            )}
          </div>
        </div>
        {/* Beneficiaries */}
        <div>
          <label className="block font-medium">Beneficiaries</label>
          <textarea
            {...register("beneficiaries", {
              required: "Beneficiaries are required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.beneficiaries && (
            <p className="text-error text-sm">{errors.beneficiaries.message}</p>
          )}
        </div>

        {/* Objectives */}
        <div>
          <label className="block font-medium">Objectives</label>
          <textarea
            {...register("objectives", {
              required: "Objectives are required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.objectives && (
            <p className="text-error text-sm">{errors.objectives.message}</p>
          )}
        </div>

        {/* Expected Outcomes */}
        <div>
          <label className="block font-medium">Expected Outcomes</label>
          <textarea
            {...register("expected_outcomes", {
              required: "Expected outcomes are required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.expected_outcomes && (
            <p className="text-error text-sm">
              {errors.expected_outcomes.message}
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-start items-center">
          {/* Responsible Officer Name */}
          <div className="grow">
            <label className="block font-medium">
              Responsible Officer Name
            </label>
            <input
              type="text"
              {...register("responsible_officer_name", {
                required: "Responsible officer name is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.responsible_officer_name && (
              <p className="text-error text-sm">
                {errors.responsible_officer_name.message}
              </p>
            )}
          </div>

          {/* Responsible Officer Contact */}
          <div className="grow">
            <label className="block font-medium">
              Responsible Officer Contact
            </label>
            <input
              type="text"
              {...register("responsible_officer_contact", {
                required: "Responsible officer contact is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.responsible_officer_contact && (
              <p className="text-error text-sm">
                {errors.responsible_officer_contact.message}
              </p>
            )}
          </div>

          {/* Responsible Officer Email */}
          <div className="grow">
            <label className="block font-medium">
              Responsible Officer Email
            </label>
            <input
              type="email"
              {...register("responsible_officer_email", {
                required: "Responsible officer email is required",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.responsible_officer_email && (
              <p className="text-error text-sm">
                {errors.responsible_officer_email.message}
              </p>
            )}
          </div>
        </div>

        {/* Priority Code */}
        <div>
          <label className="block font-medium">Priority Code</label>
          <select
            {...register("priority_code", {
              required: "Priority code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Priority</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
          {errors.priority_code && (
            <p className="text-error text-sm">{errors.priority_code.message}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Prepared By */}
          <div className="">
            <label className="block font-medium">Prepared By</label>
            <input
              {...register("prepared_by", {
                required: "Prepared by is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.prepared_by && (
              <p className="text-red-500 text-sm">
                {errors.prepared_by.message}
              </p>
            )}
          </div>

          {/* Submitted By */}
          <div>
            <label className="block font-medium">Submitted By</label>
            <input
              {...register("submitted_by", {
                required: "Submitted by is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.submitted_by && (
              <p className="text-red-500 text-sm">
                {errors.submitted_by.message}
              </p>
            )}
          </div>

          {/* Approved By */}
          <div>
            <label className="block font-medium">Approved By</label>
            <input
              {...register("approved_by", {
                required: "Approved by is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.approved_by && (
              <p className="text-red-500 text-sm">
                {errors.approved_by.message}
              </p>
            )}
          </div>

          {/* Entry By */}
          <div>
            <label className="block font-medium">Entry By</label>
            <input
              {...register("entry_by", { required: "Entry by is required" })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.entry_by && (
              <p className="text-red-500 text-sm">{errors.entry_by.message}</p>
            )}
          </div>

          {/* Requested By */}
          <div>
            <label className="block font-medium">Requested By</label>
            <input
              {...register("requested_by", {
                required: "Requested by is required",
              })}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            {errors.requested_by && (
              <p className="text-red-500 text-sm">
                {errors.requested_by.message}
              </p>
            )}
          </div>
        </div>

        {/* SDG Code */}
        <div>
          <label className="block font-medium">SDG Code</label>
          <input
            {...register("sdg_code", { required: "SDG Code is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.sdg_code && (
            <p className="text-red-500 text-sm">{errors.sdg_code.message}</p>
          )}
        </div>

        {/* SDG Name */}
        <div>
          <label className="block font-medium">SDG Name</label>
          <input
            {...register("sdg_name", { required: "SDG Name is required" })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.sdg_name && (
            <p className="text-red-500 text-sm">{errors.sdg_name.message}</p>
          )}
        </div>

        {/* Gender Code */}
        <div>
          <label className="block font-medium">Gender Code</label>
          <input
            {...register("gender_code", {
              required: "Gender Code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.gender_code && (
            <p className="text-red-500 text-sm">{errors.gender_code.message}</p>
          )}
        </div>

        {/* Climate Code */}
        <div>
          <label className="block font-medium">Climate Code</label>
          <input
            {...register("climate_code", {
              required: "Climate Code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.climate_code && (
            <p className="text-red-500 text-sm">
              {errors.climate_code.message}
            </p>
          )}
        </div>

        {/* Strategic Code */}
        <div>
          <label className="block font-medium">Strategic Code</label>
          <input
            {...register("strategic_code", {
              required: "Strategic Code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.strategic_code && (
            <p className="text-red-500 text-sm">
              {errors.strategic_code.message}
            </p>
          )}
        </div>

        {/* Project Nature */}
        <div>
          <label className="block font-medium">Project Nature</label>
          <select
            {...register("project_nature", {
              required: "Project Nature is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Project Nature
            </option>
            <option value="LOCAL_LEVEL_PRIDE_PROJECT">
              Local Level Pride Project
            </option>
            <option value="GAME_CHANGER_PROJECT">Game Changer Project</option>
            <option value="GENERAL">General</option>
          </select>
          {errors.project_nature && (
            <p className="text-red-500 text-sm">
              {errors.project_nature.message}
            </p>
          )}
        </div>

        {/* Budget Code */}
        <div>
          <label className="block font-medium">Budget Code</label>
          <input
            {...register("budget_code", {
              required: "Budget Code is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.budget_code && (
            <p className="text-red-500 text-sm">{errors.budget_code.message}</p>
          )}
        </div>

        {/* Implementation Method */}
        <div>
          <label className="block font-medium">Implementation Method</label>
          <input
            {...register("implementation_method", {
              required: "Implementation Method is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {errors.implementation_method && (
            <p className="text-red-500 text-sm">
              {errors.implementation_method.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium">Implementation Status</label>
          <select
            {...register("implementation_status", {
              required: "Implementation Status is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Implementation Status
            </option>
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          {errors.implementation_status && (
            <p className="text-red-500 text-sm">
              {errors.implementation_status.message}
            </p>
          )}
        </div>

        {/* Inception Status */}
        <div>
          <label className="block font-medium">Inception Status</label>
          <select
            {...register("inception_status", {
              required: "Inception Status is required",
            })}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Inception Status
            </option>
            <option value="IDENTIFICATION">Identification</option>
            <option value="EVALUATION">Evaluation</option>
          </select>
          {errors.inception_status && (
            <p className="text-red-500 text-sm">
              {errors.inception_status.message}
            </p>
          )}
        </div>
        <Button variant="filled" color="primary" type="submit">
          {mutation.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ProjectRegisterTab;
