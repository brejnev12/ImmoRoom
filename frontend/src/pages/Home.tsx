import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../services/api";
import type { Item } from "../types/item";
import ItemCard from "../components/ItemCard";

const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error("Échec du chargement", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cet élément ?")) return;
    try {
      await deleteItem(id);
      fetchItems();
    } catch (err) {
      console.error("Suppression Impossible", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Liste des annonces</h1>
      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">Aucune annonce.</p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {items.map(item => (
            <ItemCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
