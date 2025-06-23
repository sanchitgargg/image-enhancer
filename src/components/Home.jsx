import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";

const Home = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImageHandler = async (file) => {
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);

    // Calling Api to enhance image
    try {
      const enhancedURL = await enhancedImageAPI(file);
      setEnhancedImage(enhancedURL.image);
      setLoading(false);
    } catch (error) {
      console.log(error);
      // alert("Error while enhancing the image. Please try again!!");
    }
  };
  console.log(enhancedImage);

  return (
    <>
      <ImageUpload uploadImageHandler={uploadImageHandler} />
      <ImagePreview
        loading={loading}
        uploadImage={uploadImage}
        enhanced={enhancedImage?.image}
      />
    </>
  );
};

export default Home;
