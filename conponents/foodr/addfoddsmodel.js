import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, Image as ImageIcon } from "lucide-react";

// Adicionei a prop isLoading para evitar cliques duplos
export default function AddFoodModal({
  open,
  onClose,
  onSave,
  isLoading = false,
}) {
  const initialData = {
    name: "",
    category: "frutas",
    calories_per_100g: "",
    protein: "",
    carbs: "",
    fat: "",
    fiber: "",
    benefits: "",
    image_url: "",
    recommended_for_weight_loss: true, // Padrão
  };

  const [formData, setFormData] = useState(initialData);

  // Reseta o formulário toda vez que o modal é aberto
  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      calories_per_100g: parseFloat(formData.calories_per_100g),
      protein: formData.protein ? parseFloat(formData.protein) : 0,
      carbs: formData.carbs ? parseFloat(formData.carbs) : 0,
      fat: formData.fat ? parseFloat(formData.fat) : 0,
      fiber: formData.fiber ? parseFloat(formData.fiber) : 0,
    });
    // Não resetamos aqui, deixamos o useEffect resetar ao reabrir,
    // ou o pai fechar o modal. Isso evita perder dados se der erro no save.
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
              <Plus className="w-5 h-5" />
            </span>
            Adicionar Novo Alimento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nome */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Nome do Alimento *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ex: Maçã Gala"
                className="text-lg"
              />
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frutas">Frutas</SelectItem>
                  <SelectItem value="vegetais">Vegetais</SelectItem>
                  <SelectItem value="proteinas">Proteínas</SelectItem>
                  <SelectItem value="graos">Grãos</SelectItem>
                  <SelectItem value="laticinios">Laticínios</SelectItem>
                  <SelectItem value="gorduras_saudaveis">
                    Gorduras Saudáveis
                  </SelectItem>
                  <SelectItem value="bebidas">Bebidas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Calorias */}
            <div className="space-y-2">
              <Label htmlFor="calories">Calorias (kcal/100g) *</Label>
              <Input
                id="calories"
                type="number"
                step="0.1"
                required
                value={formData.calories_per_100g}
                onChange={(e) =>
                  handleChange("calories_per_100g", e.target.value)
                }
                placeholder="Ex: 52"
              />
            </div>

            {/* Macros (Opcionais) */}
            <div className="space-y-2">
              <Label htmlFor="protein">Proteína (g)</Label>
              <Input
                id="protein"
                type="number"
                step="0.1"
                value={formData.protein}
                onChange={(e) => handleChange("protein", e.target.value)}
                placeholder="0.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs">Carboidratos (g)</Label>
              <Input
                id="carbs"
                type="number"
                step="0.1"
                value={formData.carbs}
                onChange={(e) => handleChange("carbs", e.target.value)}
                placeholder="0.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fat">Gordura (g)</Label>
              <Input
                id="fat"
                type="number"
                step="0.1"
                value={formData.fat}
                onChange={(e) => handleChange("fat", e.target.value)}
                placeholder="0.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiber">Fibra (g)</Label>
              <Input
                id="fiber"
                type="number"
                step="0.1"
                value={formData.fiber}
                onChange={(e) => handleChange("fiber", e.target.value)}
                placeholder="0.0"
              />
            </div>

            {/* Checkbox: Recomendado */}
            <div className="flex items-center space-x-2 md:col-span-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <input
                type="checkbox"
                id="recommended"
                className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
                checked={formData.recommended_for_weight_loss}
                onChange={(e) =>
                  handleChange("recommended_for_weight_loss", e.target.checked)
                }
              />
              <Label
                htmlFor="recommended"
                className="cursor-pointer font-medium text-gray-700"
              >
                Este alimento é recomendado para perda de peso?
              </Label>
            </div>

            {/* Benefícios */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="benefits">Benefícios (Opcional)</Label>
              <Textarea
                id="benefits"
                value={formData.benefits}
                onChange={(e) => handleChange("benefits", e.target.value)}
                placeholder="Ex: Rico em antioxidantes..."
                rows={3}
              />
            </div>

            {/* Imagem com Preview */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image_url">URL da Imagem</Label>
              <div className="flex gap-4 items-start">
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleChange("image_url", e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="flex-1"
                />
                {/* Preview Quadrado */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  {formData.image_url ? (
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <ImageIcon className="text-gray-400 w-8 h-8" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 w-32"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
