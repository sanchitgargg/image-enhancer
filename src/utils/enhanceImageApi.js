const API_KEY = "wxw77tcp1xjtuv5uj";
const BASE_URL = "https://techhk.aoscdn.com/";

const enhanceImageApi = async (file) => {
  try {
    const taskId = await uploadImage(file);
    const enhancedImageData = await PollForEnhancedImage(taskId);

    console.log("Enhanced Image Data:", enhancedImageData);
  } catch (error) {
    console.log("Error Enhancing Image:", error.message);
  }
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,  // Corrected URL
    formData,
    {
      headers: {
        "Content-type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! Task id not found");
  }

  return data.data.task_id;  // Ensure task_id is returned correctly
};

const fetchEnhancedImage = async (taskId) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data) {
    throw new Error("Failed to fetch enhanced image");
  }

  return data.data;
};

const PollForEnhancedImage = async (taskId, retries = 0) => {
  const result = await fetchEnhancedImage(taskId);

  if (result.state === 4) {
    console.log("Processing...");

    if (retries >= 20) {
      throw new Error("Max retries reached. Please try again later.");
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return PollForEnhancedImage(taskId, retries + 1);
  }

  console.log("Enhanced Image URL:", result);  // Assuming `result` has the URL or relevant image data
  return result;
};
