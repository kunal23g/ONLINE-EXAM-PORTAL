export const getEnrolledStudents = async () => {
  try {
    const response = await fetch(
      `http://localhost:5000/auth/getEnrolledStudents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
