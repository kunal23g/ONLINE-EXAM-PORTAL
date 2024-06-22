export const addQuiz = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/quiz/addQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
