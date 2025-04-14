import React, { useState } from "react";

const NewDevelopmentform = () => {
  const [formData, setFormData] = useState({
    newImage: null,
    newTitle: "",
    link: "",
  });

  const handleChange = (e, section, field) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: e.target.value,
      },
    });
  };

  const handleImageChange = (e, section) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        image: e.target.files[0],
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="w-full mx-auto p-4 md:p-8 font-inter">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md p-6 mb-6">
          <h3 className="font-semibold text-lg">New Development Section</h3>
          <input
            type="file"
            onChange={(e) => handleImageChange(e, "heroImage")}
            className="w-full p-2 border outline-none  mb-2"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <input
              type="text"
              name="newTitle"
              value={formData.newTitle}
              onChange={(e) => handleChange(e, "newTitle")}
              placeholder="new Title"
              className="w-full p-2 border outline-none"
            />
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={(e) => handleChange(e, "link")}
              placeholder="Link"
              className="w-full p-2 border outline-none"
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            className="font-inter px-6 py-3 text-black border border-[#00603A] hover:bg-[#00603A] hover:text-white transition-all duration-300"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewDevelopmentform;
