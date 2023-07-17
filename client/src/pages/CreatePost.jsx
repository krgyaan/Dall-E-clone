import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets'; // Importing image assets
import { Loader, FormField } from '../components'; // Importing custom components
import { getRandomPrompt } from '../utils'; // Importing utility function

const CreatePost = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [form, setForm] = useState({ // State to manage form data
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false); // State to manage image generation loading state
  const [loading, setLoading] = useState(false); // State to manage form submission loading state

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value }); // Function to handle input changes and update the form state

  const handleSurpriseMe = () => { // Function to handle the "Surprise Me" button click
    const randonmPrompt = getRandomPrompt(form.prompt); // Getting a random prompt
    setForm({ ...form, prompt: randonmPrompt }); // Updating the form state with the random prompt
  }
  const generateImage = async () => { // Function to generate an image through DALL-E AI
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", { // Fetching the image from the DALL-E API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt: form.prompt, // Sending the prompt data to the API
          }), // Sending the prompt data to the API
        }); 

        const data = await response.json(); // Parsing the response data
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` }); // Updating the form with the generated image data

      } catch (error) {
        alert("A " + error); // Displaying an alert in case of an error
      } finally {
        setGeneratingImg(false); // Resetting the image generation loading state
      }
    } else {
      alert('Please enter a prompt'); // Displaying an alert if no prompt is entered
    }
  }

  const handleSubmit = async (e) => { // Function to handle form submission
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true); // Setting the loading state to true during form submission
      try {
        const response = await fetch('https://localhost:8080/api/v1/posts', { // Sending a POST request to create a new post
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }), // Sending the form data as the request body
        });

        await response.json(); // Parsing the response data
        alert('Post created successfully'); // Displaying a success message
        navigate('/'); // Redirecting to the homepage
      } catch (error) {
        alert("B " + error.message); // Displaying an alert in case of an error during form submission
        console.log(error)
      } finally {
        setLoading(false); // Resetting the loading state after form submission
      }
    } else {
      alert('Please generate an image first'); // Displaying an alert if the image is not generated yet
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Create
        </h1>
        <p className="text-[#646e75] text-[16px] mt-2 max-w-[500px]">
          Create imaginatve and visually stunning images through DALL-E AI and share with the community.
        </p>
      </div>

      <form className="mt-16max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            placeholder="Enter your name"
            name="name"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            placeholder="panda mad scientist mixing sparkling chemicals, digital art"
            name="prompt"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blur-500 w-64 p-3 h-64  flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 flex justify-center items-center bg-gray-800/50 rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        <div className='mt-10'>
          <p className="text-[14px] mt-2 text-[#666f74]">
            Once you created the image then if you want you can share it with others in the community
          </p>
          <button
            className="mt-3 text-white bg-[#6469ff] rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center font-medium"
          >
            {loading ? ".........." : "Share with community"}
          </button>
        </div>
      </form>

    </section>
  )
}

export default CreatePost;
