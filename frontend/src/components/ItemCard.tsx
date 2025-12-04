import React from "react";
import { Link } from "react-router-dom";
import type { Item } from "../types/item";

interface Props {
  item: Item;
  onDelete: (id: number) => void;
}

const ItemCard: React.FC<Props> = ({ item, onDelete }) => (
  <div className="border rounded p-4 shadow hover:shadow-md w-64 flex flex-col items-center">
    <h3 className="text-xl font-bold mb-2 text-center">{item.title}</h3>
    <p className="text-center">Ville: {item.city}</p>
    <p className="text-center">Prix: {item.price.toLocaleString("fr-FR")} €</p>
    <p className="text-center">Surface: {item.surface} m²</p>

    <div className="mt-3 flex gap-2">
      <Link
          to={`/items/${item.id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Voir
        </Link>
      <Link
        to={`/edit/${item.id}`}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Editer
      </Link>
      
      <button
        onClick={() => onDelete(item.id)}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Supprimer
      </button>
      
    </div>
  </div>
);

export default ItemCard;
