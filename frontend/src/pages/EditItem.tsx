import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, updateItem } from "../services/api";
import type { Item } from "../types/item";

const EditItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Item, "id">>({
    title: "",
    city: "",
    price: 0,
    surface: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const data = await getItem(Number(id));
        setForm({
          title: data.title,
          city: data.city,
          price: data.price,
          surface: data.surface,
        });
      } catch {
        setError("Impossible de charger l'annonce");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "price" || name === "surface" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

   
    if (!form.title || !form.city || !form.price || !form.surface) {
      setError("Tous les champs doivent être remplis !");
      return;
    }

    try {
      if (!id) return;
      await updateItem(Number(id), form);
      navigate("/");
    } catch {
      setError("Erreur lors de la mise à jour de l'annonce !");
    }
  };

  if (loading) {
    return <p className="text-center mt-4 text-gray-500">Chargement...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Éditer l'annonce</h1>

      
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditItem;
