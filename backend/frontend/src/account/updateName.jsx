import React, { useState, useEffect, useContext } from "react";
import dyari from "../assets/dyari.svg";
import biscuit1 from "../assets/biscuit50.jpg";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import axios from "axios";

const UpdateName = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedLastName, setEditedLastName] = useState(user?.lastName || "");
  const [selectedSpecialities, setSelectedSpecialities] = useState(
    user?.speciality || []
  );
  const [selectedLocation, setSelectedLocation] = useState(
    user?.localisation || "Tunisie"
  );
  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setEditedLastName(e.target.value);
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSpecialities([...selectedSpecialities, value]);
    } else {
      setSelectedSpecialities(selectedSpecialities.filter((s) => s !== value));
    }
  };
  const isEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  };
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };
  console.log(user);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    setEditedName(user?.name || "");
    setEditedLastName(user?.lastName || "");
    setSelectedSpecialities(user?.speciality || []);
    setSelectedLocation(user?.localisation || "Tunisie");
    // Calculate the number of empty article objects needed
    const emptyCount = Math.max(6 - (user?.articles?.length || 0), 0);
    setArticles(Array.from({ length: emptyCount }, () => ({})));
  }, [user]);
  console.log(articles);
  const { type } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setSelectedPhoto(photoUrl);
    }
  };
  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      // Create a copy of the articles array
      const updatedArticles = [...articles];
      // Update the object at the specified index with the new image file
      updatedArticles[index] = { ...updatedArticles[index], image: file };
      // Update the state with the modified array
      setArticles(updatedArticles);
    }
  };
  const handlePriceChange = (event, index) => {
    const price = event.target.value;
    const updatedArticles = [...articles];
    updatedArticles[index] = { ...updatedArticles[index], price };
    setArticles(updatedArticles);
  };

  const handleTypeChange = (event, index, type) => {
    const updatedArticles = [...articles];
    updatedArticles[index] = { ...updatedArticles[index], type };
    setArticles(updatedArticles);
  };
  const addArticle = async (article) => {
    // First, upload the image if provided
    let updatedArticle = { ...article };

    if (article.image) {
      const formData = new FormData();
      formData.append("image", article.image);
      console.log("Uploading image:", article.image);

      try {
        const uploadResponse = await axios.post(
          "https://dyari1.onrender.com/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // Update the article with the uploaded image URL
        updatedArticle.image = uploadResponse.data.url;
      } catch (error) {
        console.error("Error uploading image:", error);
        return null; // Optionally, you can handle this error differently
      }
    }

    // Now add the article with the (possibly updated) image URL to the shop
    try {
      const response = await axios.post(
        `https://dyari1.onrender.com/api/shop/${user._id}/article`,
        updatedArticle
      );
      setUser(response.data.shop);
      alert("article added");
    } catch (error) {
      console.error(
        "Error adding article:",
        error.response?.data || error.message
      );
      return null;
    }
  };
  const deleteArticle = async (articleId) => {
    try {
      const response = await axios.delete(
        `https://dyari1.onrender.com/api/shop/${user._id}/article/${articleId}`
      );
      setUser(response.data.shop);
      alert("article deleted");
    } catch (error) {
      console.error(
        "Error deleting article:",
        error.response?.data || error.message
      );
      return null;
    }
  };
  return (
    <div>
      <Link className="absolute flex items-center gap-1 top-4 left-8" to={"/"}>
        <img className="w-7" src={dyari} />
        <h1 className="text-2xl font-medium text-amber-800">Dyari</h1>
      </Link>
      <div className="flex flex-col h-screen items-center pt-16 bg-[#F5F5F5] gap-y-4">
        <div className="relative w-1/2 bg-white shadow-md rounded-md ">
          {type == "name" && (
            <div className="flex p-1">
              <input
                type="text"
                name="name"
                value={editedName}
                placeholder="Prénom"
                onChange={handleNameChange}
                required
                className="w-1/2 rounded-[5px] border border-gray-400 px-[10px] py-[8px] text-[15px]"
              />
              <div className="flex flex-1 justify-end items-center">
                <button
                  disabled={editedName === user?.name}
                  className={`px-[32px] font-semibold text-[15px] h-[30px] rounded-[6px] ${
                    editedName === user?.name
                      ? "bg-gray-400"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          )}
          {type == "last-name" && (
            <div className="flex p-1">
              <input
                type="text"
                name="lastName"
                placeholder="Nom de famille"
                value={editedLastName}
                onChange={handleLastNameChange}
                required
                className="w-1/2 rounded-[5px] border border-gray-400 px-[10px] py-[8px] text-[15px]"
              />
              <div className="flex flex-1 justify-end items-center">
                <button
                  disabled={editedLastName === user?.lastName}
                  className={`px-[32px] font-semibold text-[15px] h-[30px] rounded-[6px] ${
                    editedLastName === user?.lastName
                      ? "bg-gray-400"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          )}
          {type == "speciality" && (
            <div className="p-2">
              <div className="flex space-x-1">
                {["sales", "sucres", "gateaux", "biscuit"].map((speciality) => (
                  <label
                    key={speciality}
                    className="flex items-center space-x-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100 w-1/4"
                  >
                    <span>{speciality}</span>
                    <input
                      type="checkbox"
                      value={speciality}
                      checked={selectedSpecialities.includes(speciality)}
                      onChange={handleCheckboxChange}
                      className="accent-blue-500"
                    />
                  </label>
                ))}
              </div>
              <div className="flex w-full justify-center items-center mt-3">
                <button
                  disabled={isEqual(selectedSpecialities, user?.speciality)}
                  className={`px-[32px] font-semibold text-[15px] h-[30px] rounded-[6px] ${
                    isEqual(selectedSpecialities, user?.speciality)
                      ? "bg-gray-400"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          )}
          {type == "location" && (
            <div className="flex p-1">
              <select
                name="localisation"
                value={selectedLocation}
                onChange={handleLocationChange}
                required
                className="h-[36px] text-[#1c1e21] rounded-[4px] px-[8px] pr-[20px] border border-gray-400 w-1/2"
              >
                <option value="Tunisie">Tunisie</option>
                <option value="Ariana">Ariana</option>
                <option value="Manouba">Manouba</option>
                <option value="Ben Arous">Ben Arous</option>
                <option value="Nabeul">Nabeul</option>
                <option value="Bizerte">Bizerte</option>
                <option value="Zaghouan">Zaghouan</option>
                <option value="Sousse">Sousse</option>
                <option value="Monastir">Monastir</option>
                <option value="Mahdia">Mahdia</option>
                <option value="Sfax">Sfax</option>
                <option value="Béja">Béja</option>
                <option value="Jendouba">Jendouba</option>
                <option value="Le Kef">Le Kef</option>
                <option value="Siliana">Siliana</option>
                <option value="Kairouan">Kairouan</option>
                <option value="Sidi Bouzid">Sidi Bouzid</option>
                <option value="Kasserine">Kasserine</option>
                <option value="Gabès">Gabès</option>
                <option value="Médenine">Médenine</option>
                <option value="Gafsa">Gafsa</option>
                <option value="Tozeur">Tozeur</option>
                <option value="Tataouine">Tataouine</option>
                <option value="Kébili">Kébili</option>
              </select>
              <div className="flex flex-1 justify-end items-center">
                <button
                  disabled={selectedLocation === user?.location}
                  className={`px-[32px] font-semibold text-[15px] h-[30px] rounded-[6px] ${
                    selectedLocation === user?.localisation
                      ? "bg-gray-400"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          )}
          {type == "items" && (
            <div className="grid grid-cols-3 gap-x-3 gap-y-6 w-fit py-4">
              {user?.articles.map((article, index) => (
                <div key={index} className="flex flex-col gap-y-1">
                  <div className="flex justify-center">
                    <img
                      src={
                        article.image
                          ? // ? URL.createObjectURL(article.image)
                            article.image
                          : biscuit1 // Default placeholder image
                      }
                      alt={`Article ${index + 1}`}
                      className="w-36 h-44 object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-x-1">
                    <div className="flex w-full items-center justify-center py-[2px]">
                      <h1 className="text-sm">
                        {article.price} dt par {article.type}
                      </h1>
                    </div>
                  </div>
                  <div className="flex ">
                    <button
                      className="p-1 text-xs bg-red-500 w-full text-white"
                      onClick={() => deleteArticle(article._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
              {articles.map((article, index) => {
                const isDisabled =
                  !article.image ||
                  !article.type ||
                  !article.price?.toString().trim() ||
                  isNaN(article.price);

                return (
                  <div key={index} className="flex flex-col gap-y-1">
                    <div className="relative group flex justify-center">
                      <img
                        src={
                          article.image
                            ? URL.createObjectURL(article.image)
                            : biscuit1
                        }
                        alt={`Article ${index + 1}`}
                        className="w-36 h-44 object-cover cursor-pointer"
                        onClick={() =>
                          document.getElementById(`fileInput-${index}`).click()
                        }
                      />
                      <input
                        type="file"
                        id={`fileInput-${index}`}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, index)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-x-1 w-fit">
                        <div className="flex items-center gap-x-1 py-[2px]">
                          <h1 className="text-sm">kg</h1>
                          <input
                            type="radio"
                            name={`type-${index}`}
                            onChange={(e) => handleTypeChange(e, index, "kg")}
                          />
                        </div>
                        <h1 className="text-sm text-gray-500">ou</h1>
                        <div className="flex items-center gap-x-1 py-[2px]">
                          <h1 className="text-sm">piéce</h1>
                          <input
                            type="radio"
                            name={`type-${index}`}
                            onChange={(e) =>
                              handleTypeChange(e, index, "piéce")
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-x-1 w-fit">
                        <input
                          type="text"
                          placeholder="Prix"
                          className="rounded-md border border-gray-500 px-3 text-sm w-12"
                          value={article.price || ""}
                          onChange={(e) => handlePriceChange(e, index)}
                        />
                        <h1 className="text-sm">dt</h1>
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        className={`p-1 text-xs w-full text-white ${
                          isDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500"
                        }`}
                        disabled={isDisabled}
                        onClick={() => addArticle(article)}
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {type == "profile-picture" && (
            <div className="flex flex-col items-center">
              {selectedPhoto ? (
                <img
                  src={selectedPhoto}
                  alt="Uploaded Profile"
                  className="w-[42px] h-[42px] p-[2px] rounded-full border"
                />
              ) : (
                <div />
              )}
              <label
                htmlFor="upload-photo"
                className="mt-1 px-2 py-2 bg-white text-black text-sm font-normal rounded cursor-pointer hover:bg-gray-200 border"
              >
                Upload Photo
              </label>
              <input
                id="upload-photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateName;
