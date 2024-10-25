import API_ROUTE from "../assets/baseRoute";
export async function refreshToken(jwtToken) {
  const apiRoute = `${API_ROUTE}/auth/verifyandrefreshtoken`;

  try {
    const response = await fetch(apiRoute, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

export default refreshToken;
