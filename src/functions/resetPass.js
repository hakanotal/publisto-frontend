import apiUrl from "../constants/apiURL";
export default resetPass = async (mail) => {
  const response = await fetch(apiUrl + "/api/v1/user/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: mail,
    }),
  });
  if (response.status !== 200) {
    alert(
      "Can not send email! Either your email not found or you are not registered!"
    );
    return false;
  } else {
    return true;
  }
};
