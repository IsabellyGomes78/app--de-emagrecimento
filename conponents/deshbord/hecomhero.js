import React from "react";
import { Leaf, TrendingDown, TrendingUp } from "lucide-react"; // Adicionei TrendingUp
import { Card } from "@/components/ui/card";

export default function WelcomeHero({ profile, user }) {
  const getBMI = () => {
    // Adicionei proteção para altura ser maior que 0 para evitar divisão por zero
    if (!profile?.height || profile.height <= 0 || !profile?.current_weight)
      return null;
    const heightInMeters = profile.height / 100;
    return (profile.current_weight / (heightInMeters * heightInMeters)).toFixed(
      1
    );
  };

  const getWeightDifference = () => {
    if (!profile?.current_weight || !profile?.target_weight) return null;
    // Retorna a diferença bruta (pode ser negativa ou positiva)
    return (profile.current_weight - profile.target_weight).toFixed(1);
  };

  const bmi = getBMI();
  const weightDiff = getWeightDifference();
  const diffValue = weightDiff ? parseFloat(weightDiff) : 0;

  // Define se o objetivo é perder ou ganhar peso
  const isWeightLoss = diffValue > 0;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 rounded-3xl p-8 md:p-12 mb-8">
      {/* Elementos de fundo (Blobs) mantidos */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-30 -translate-y-20 translate-x-20" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-100 rounded-full blur-3xl opacity-30 translate-y-10 -translate-x-10" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-500 rounded-2xl">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Olá, {user?.full_name?.split(" ")[0] || "Visitante"}!
          </h1>
        </div>

        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          Sua jornada rumo a uma vida mais saudável começa aqui. Vamos
          conquistar seus objetivos juntos.
        </p>

        {profile && (
          <div className="flex flex-wrap gap-4">
            <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 px-6 py-4">
              <p className="text-sm text-gray-600 mb-1">Peso Atual</p>
              <p className="text-2xl font-bold text-emerald-600">
                {profile.current_weight} kg
              </p>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 px-6 py-4">
              <p className="text-sm text-gray-600 mb-1">Meta</p>
              <p className="text-2xl font-bold text-emerald-600">
                {profile.target_weight} kg
              </p>
            </Card>

            {/* Lógica melhorada para Ganhar ou Perder peso */}
            {weightDiff && Math.abs(diffValue) > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 px-6 py-4">
                <p className="text-sm text-gray-600 mb-1">
                  {isWeightLoss ? "Falta Perder" : "Falta Ganhar"}
                </p>
                <div className="flex items-center gap-2">
                  {isWeightLoss ? (
                    <TrendingDown className="w-5 h-5 text-orange-500" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                  )}
                  <p
                    className={`text-2xl font-bold ${
                      isWeightLoss ? "text-orange-500" : "text-blue-500"
                    }`}
                  >
                    {Math.abs(diffValue).toFixed(1)} kg
                  </p>
                </div>
              </Card>
            )}

            {bmi && (
              <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 px-6 py-4">
                <p className="text-sm text-gray-600 mb-1">IMC</p>
                <p className="text-2xl font-bold text-emerald-600">{bmi}</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
