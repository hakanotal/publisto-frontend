import getToken from "./getToken";

export default takeRecommendation = async (user_id) => {
    const token = await getToken();
    const response = await fetch("https://publisto-recommender.up.railway.app/recs/" + user_id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
    });
    if (response.status !== 200) {
      console.log("Error: " + response.status);
    }
    const data = await response.json();
    return data;
  };