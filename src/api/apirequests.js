const cloud_url =
  "https://eurmpfph3wu5w7rmksrgt46b5q0prnws.lambda-url.eu-central-1.on.aws";

  
const tryLogin = async () => {
  /*
   *   Try to login with the given credentials
   */
  if (isValidEmail(email)) {
    let response = await fetch(cloud_url + "/api/v1/user/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        //console.log(json.access_token)
        storeToken(json.access_token);
        navigation.navigate("TabStack");
      })
      .catch((error) => console.error(error));
  } else {
    alert("Please enter a valid email address");
  }
};
