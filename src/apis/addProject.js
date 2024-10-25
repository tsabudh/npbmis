import API_ROUTE from "../assets/baseRoute";

async function addProjects(projectData, jwtToken) {
  try {
    // Send POST request with the project data
    const response = await fetch(`${API_ROUTE}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(projectData), // Convert projectData object to JSON
    });

    // Handle the response
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const result = await response.json(); // Parse the JSON response
    return result;
  } catch (error) {
    console.error("Error submitting project:", error.message);
  }
}
export default addProjects;
