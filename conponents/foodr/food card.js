import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

const categoryConfig = {
  frutas: { icon: "🍎", style: "bg-red-100 text-red-700 border-red-200" },
  vegetais: {
    icon: "🥬",
    style: "bg-green-100 text-green-700 border-green-200",
  },
  proteinas: {
    icon: "🍗",
    style: "bg-orange-100 text-orange-700 border-orange-200",
  },
  graos: { icon: "🌾", style: "bg-amber-100 text-amber-700 border-amber-200" },
  laticinios: {
    icon: "🥛",
    style: "bg-blue-100 text-blue-700 border-blue-200",
  },
  gorduras_saudaveis: {
    icon: "🥑",
    style: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  bebidas: { icon: "🥤", style: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  // Adicionei um padrão para caso a categoria não exista
  default: { icon: "🍽️", style: "bg-gray-100 text-gray-700 border-gray-200" },
};

export default function FoodCard({ food, onClick }) {
  // Estado para controlar erro de carregamento da imagem
  const [imgError, setImgError] = useState(false);

  if (!food) return null;

  // Normaliza a categoria (ex: "Gorduras Saudáveis" vira "gorduras_saudaveis")
  // Isso evita erros se o banco de dados mandar maiúsculas ou espaços
  const normalizeCategory = (cat) => {
    if (!cat) return "default";
    const key = cat
      .toLowerCase()
      .replace(/\s+/g, "_")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return categoryConfig[key] ? key : "default";
  };

  const categoryKey = normalizeCategory(food.category);
  const config = categoryConfig[categoryKey];

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card
        className="cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-100 overflow-hidden group h-full flex flex-col"
        onClick={() => onClick && onClick(food)}
      >
        {/* Área da Imagem / Ícone */}
        <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          {food.image_url && !imgError ? (
            <img
              src={food.image_url}
              alt={food.name}
              onError={() => setImgError(true)} // Se a imagem quebrar, mostra o ícone
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="text-6xl select-none animate-in fade-in zoom-in duration-300">
              {config.icon}
            </div>
          )}

          <div className="absolute top-3 right-3">
            <Badge className={`${config.style} border capitalize shadow-sm`}>
              {food.category || "Geral"}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5 flex-1 flex flex-col">
          <h3
            className="font-bold text-lg mb-3 text-gray-900 line-clamp-1"
            title={food.name}
          >
            {food.name}
          </h3>

          <div className="space-y-3 mt-auto">
            {/* Calorias */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="font-bold text-orange-700">
                  {food.calories_per_100g} kcal
                </span>
              </div>
              <span className="text-gray-400 text-xs">/ 100g</span>
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-blue-50 px-1 py-2 rounded-lg text-center border border-blue-100">
                <p className="text-blue-900 font-bold text-sm">
                  {food.protein || 0}g
                </p>
                <p className="text-blue-500 uppercase tracking-wide text-[10px]">
                  Prot
                </p>
              </div>
              <div className="bg-amber-50 px-1 py-2 rounded-lg text-center border border-amber-100">
                <p className="text-amber-900 font-bold text-sm">
                  {food.carbs || 0}g
                </p>
                <p className="text-amber-500 uppercase tracking-wide text-[10px]">
                  Carb
                </p>
              </div>
              <div className="bg-purple-50 px-1 py-2 rounded-lg text-center border border-purple-100">
                <p className="text-purple-900 font-bold text-sm">
                  {food.fat || 0}g
                </p>
                <p className="text-purple-500 uppercase tracking-wide text-[10px]">
                  Gord
                </p>
              </div>
            </div>

            {food.benefits && (
              <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                {food.benefits}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
