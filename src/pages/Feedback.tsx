import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../backendService";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/feedback", formData);

      if (response.status === 200) {
        toast.success("Feedback submitted successfully!", {
          position: "bottom-left"
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to submit feedback. Please try again. ", {
          position: "bottom-left"
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred. Please try again later.",{
        position: "bottom-left"
      });
    }
  };  
  return (
    <div className="h-4/5 ">
      <ToastContainer />
      <div className="relative pt-20 flex items-center justify-center bg-white sm:items-center sm:pt-0 pb-32">
        
              <form onSubmit={handleSubmit} className="p-6 flex flex-col justify-center">
                <div className="flex flex-col">
                  <label htmlFor="name" className="hidden">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-700 text-gray-800 font-semibold focus:border-gray-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="email" className="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-700 text-gray-800 font-semibold focus:border-gray-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col mt-2">
                  <label htmlFor="message" className="hidden">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full mt-2 py-3 px-3 rounded-lg bg-white border border-gray-700 text-gray-800 font-semibold focus:border-gray-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="md:w-32 bg-blue-900 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-gray-700 transition ease-in-out duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        
  );
};

export default Feedback;
