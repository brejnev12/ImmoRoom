import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getItem } from "../services/api";
import type { Item } from "../types/item";

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const data = await getItem(Number(id));
        setItem(data);
      } catch {
       
        setError("Impossible de charger l'annonce");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading)
    return <p className="text-center mt-4 text-gray-500">Chargement...</p>;

  if (error)
    return <p className="text-center mt-4 text-red-500">{error}</p>;

  if (!item)
    return <p className="text-center mt-4 text-gray-500">Annonce non trouvée</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-3 text-center">
      <h1 className="text-3xl font-bold mb-4 text-center">{item.title}</h1>
      <p className="mb-2">
        <span className="font-semibold">Ville :</span> {item.city}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Prix :</span> {item.price.toLocaleString("fr-FR")} €
      </p>
      <p className="mb-2">
        <span className="font-semibold">Surface :</span> {item.surface} m²
      </p>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Retour à la liste
        </Link>
      </div>
    </div>
  );
};

export default ItemDetail;
