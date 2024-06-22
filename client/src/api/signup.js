export const signup = async (user) => {
  try {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
