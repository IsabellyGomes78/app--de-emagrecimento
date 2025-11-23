import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Save, Loader2 } from "lucide-react"; // Adicionei Loader2

// Adicionei a prop 'isLoading' para receber o estado do componente pai
export default function ProfileSetup({ onSave, isLoading = false }) {
  const [formData, setFormData] = useState({
    current_weight: "",
    target_weight: "",
    height: "",
    age: "",
    gender: "outro",
    activity_level: "leve",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Converte os dados garantindo que sejam números válidos
    const payload = {
      ...formData,
      current_weight: parseFloat(formData.current_weight),
      target_weight: parseFloat(formData.target_weight),
      height: parseFloat(formData.height),
      age: parseInt(formData.age, 10),
    };

    // Validação extra de segurança
    if (payload.height <= 0 || payload.age <= 0) {
      alert("Por favor, insira valores válidos para altura e idade.");
      return;
    }

    onSave(payload);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-emerald-100">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500 rounded-xl">
            <User className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl">Complete Seu Perfil</CardTitle>
        </div>
        <p className="text-gray-600 mt-2">
          Precisamos de algumas informações para personalizar suas recomendações
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Peso Atual */}
            <div className="space-y-2">
              <Label htmlFor="current_weight">Peso Atual (kg) *</Label>
              <Input
                id="current_weight"
                type="number"
                step="0.1"
                min="0"
                required
                value={formData.current_weight}
                onChange={(e) => handleChange("current_weight", e.target.value)}
                placeholder="Ex: 75.5"
                className="text-lg"
              />
            </div>

            {/* Peso Alvo */}
            <div className="space-y-2">
              <Label htmlFor="target_weight">Peso Alvo (kg) *</Label>
              <Input
                id="target_weight"
                type="number"
                step="0.1"
                min="0"
                required
                value={formData.target_weight}
                onChange={(e) => handleChange("target_weight", e.target.value)}
                placeholder="Ex: 65.0"
                className="text-lg"
              />
            </div>

            {/* Altura */}
            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm) *</Label>
              <Input
                id="height"
                type="number"
                min="0"
                required
                value={formData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                placeholder="Ex: 170"
                className="text-lg"
              />
            </div>

            {/* Idade */}
            <div className="space-y-2">
              <Label htmlFor="age">Idade *</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="120"
                required
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                placeholder="Ex: 30"
                className="text-lg"
              />
            </div>

            {/* Gênero */}
            <div className="space-y-2">
              <Label htmlFor="gender">Gênero</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleChange("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Atividade */}
            <div className="space-y-2">
              <Label htmlFor="activity_level">Nível de Atividade</Label>
              <Select
                value={formData.activity_level}
                onValueChange={(value) => handleChange("activity_level", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentario">Sedentário</SelectItem>
                  <SelectItem value="leve">Leve (1-3x/semana)</SelectItem>
                  <SelectItem value="moderado">
                    Moderado (3-5x/semana)
                  </SelectItem>
                  <SelectItem value="intenso">Intenso (6-7x/semana)</SelectItem>
                  <SelectItem value="muito_intenso">
                    Muito Intenso (2x/dia)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Botão com Loading State */}
          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Salvar Perfil
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
