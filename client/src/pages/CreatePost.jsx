import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { Loader, FormField } from '../components';
import { getRandomPrompt } from '../utils';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });

      } catch (error) {
        alert(error.message);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }

  const handleSubmit = () => {

  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSupriseMe = () => {
    const randonmPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randonmPrompt })
  }

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
            labelName="Name"
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
            handleSupriseMe={handleSupriseMe}
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
            type="submit"
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
