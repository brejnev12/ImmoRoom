import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../services/api";
import type { Item } from "../types/item";

const CreateItem: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Item, "id">>({
    title: "",
    city: "",
    price: 0,
    surface: 0,
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "price" || name === "surface" ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    if (!form.title || !form.city || !form.price || !form.surface) {
      setError("Tous les champs doivent être remplis !");
      return;
    }

    try {
      await createItem(form);
      navigate("/");
    } catch (err) {
      console.error("Failed to create item.", err);
      setError("Erreur lors de la création de l'annonce !");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Créer une annonce</h1>

      
      {error && (
        <p className="text-red-500 mb-4 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={form.city}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="surface"
          placeholder="Surface (m²)"
          value={form.surface}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Créer
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
