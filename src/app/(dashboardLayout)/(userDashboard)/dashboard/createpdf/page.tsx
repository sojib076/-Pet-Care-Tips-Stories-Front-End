"use client"

import React, { useState } from "react";

import jsPDF from "jspdf";

const NutritionCalculator = () => {


    

type PetNutritionData = {
  [key: string]: { age: string; weightRange: string; calories: number }[];
};

const petNutritionData: PetNutritionData = {
    Dog: [
      { age: "Puppy (0-1 year)", weightRange: "5-10 kg", calories: 800 },
      { age: "Adult (1-7 years)", weightRange: "5-10 kg", calories: 700 },
      { age: "Senior (7+ years)", weightRange: "5-10 kg", calories: 650 },
      // Add more weight ranges and age groups as needed
    ],
    Cat: [
      { age: "Kitten (0-1 year)", weightRange: "2-4 kg", calories: 250 },
      { age: "Adult (1-10 years)", weightRange: "2-4 kg", calories: 200 },
      { age: "Senior (10+ years)", weightRange: "2-4 kg", calories: 180 },
      // Add more weight ranges and age groups as needed
    ],
  };
  
  const [petType, setPetType] = useState("Dog");
  const [ageCategory, setAgeCategory] = useState("");
  const [nutritionInfo, setNutritionInfo] = useState<{ age: string; weightRange: string; calories: number } | null>(null);

  const handleCalculate = () => {
    const data = petNutritionData[petType].find(
      (item) => item.age === ageCategory
    );
    setNutritionInfo(data || null);
  };

  const handleDownloadPDF = () => {
    if (!nutritionInfo) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Pet Nutrition Invoice", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Pet Type: ${petType}`, 20, 40);
    doc.text(`Age Category: ${ageCategory}`, 20, 50);
    doc.text(`Weight Range: ${nutritionInfo.weightRange}`, 20, 60);
    doc.text(`Daily Caloric Needs: ${nutritionInfo.calories} kcal`, 20, 70);

    doc.save("nutrition_invoice.pdf");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Pet Nutrition Invoice</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Pet Type</label>
        <select
          value={petType}
          onChange={(e) => {
            setPetType(e.target.value);
            setAgeCategory(""); // Reset age category when pet type changes
            setNutritionInfo(null);
          }}
          className="w-full p-2 border rounded"
        >
          {Object.keys(petNutritionData).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Age Category</label>
        <select
          value={ageCategory}
          onChange={(e) => {
            setAgeCategory(e.target.value);
            setNutritionInfo(null);
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">--Select Age Category--</option>
          {petNutritionData[petType].map((item, index) => (
            <option key={index} value={item.age}>
              {item.age}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleCalculate}
        disabled={!ageCategory}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        Calculate Nutrition
      </button>

      {nutritionInfo && (
        <div className="mt-6 p-4 bg-gray-100 border rounded">
          <h3 className="text-lg font-semibold mb-2">Nutrition Details</h3>
          <p><strong>Pet Type:</strong> {petType}</p>
          <p><strong>Age Category:</strong> {ageCategory}</p>
          <p><strong>Weight Range:</strong> {nutritionInfo.weightRange}</p>
          <p><strong>Daily Caloric Needs:</strong> {nutritionInfo.calories} kcal</p>

          <button
            onClick={handleDownloadPDF}
            className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default NutritionCalculator;
