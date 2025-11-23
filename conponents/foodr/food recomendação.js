import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import FoodCard from "./FoodCard";

// Componente visual simples para simular o carregamento (Skeleton)
const FoodCardSkeleton = () => (
  <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
    <div className="h-40 bg-gray-200 animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
      <div className="flex gap-2">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

export default function FoodRecommendations({
  foods = [],
  onFoodClick,
  isLoading = false,
}) {
  // Proteção: Se foods for nulo/undefined, usa array vazio []
  // Lógica: Filtra os recomendados. Se quiser mudar a lógica (ex: ganho de peso), mude aqui.
  const recommendedFoods = (foods || [])
    .filter((f) => f.recommended_for_weight_loss)
    .slice(0, 6);

  return (
    <Card className="shadow-lg border-emerald-100">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <CardTitle className="text-xl">
            Alimentos Recomendados para Você
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Cenário: Carregando */}
          {isLoading
            ? // Mostra 3 esqueletos enquanto carrega
              Array.from({ length: 3 }).map((_, i) => (
                <FoodCardSkeleton key={i} />
              ))
            : // 2. Cenário: Dados carregados
              recommendedFoods.map((food) => (
                <FoodCard key={food.id} food={food} onClick={onFoodClick} />
              ))}
        </div>

        {/* 3. Cenário: Vazio (Só mostra se NÃO estiver carregando e lista vazia) */}
        {!isLoading && recommendedFoods.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900">
              Nenhum destaque encontrado
            </p>
            <p className="text-sm">
              Adicione alimentos marcados como "Recomendados" ao catálogo.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
