"use client";
import Icon from "@/app/global/components/Icon";
import Image from "next/image";
import { useState, useEffect } from "react";

type Props = { onSelect: (file: File | null) => void };

export default function CarImage({ onSelect }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    onSelect(file);                                          // giv filen op til formularen
    setPreview(file ? URL.createObjectURL(file) : null);     // lokal forhåndsvisning
  }

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  return (
    <div className="flex flex-col gap-8 bg-primary-100 my-16 border-2 border-primary-400 rounded-4">
      <label className="text-sm text-primary-600 text-center flex justify-center flex-col items-center"> <Icon iconName="upload" size="lg"/> <p className="text-lg uppercase font-bold">Upload Billede</p></label>
      <input type="file" accept="image/*" onChange={handleChange} required/>
      {preview && (
        <Image src={preview} alt="Forhåndsvisning"
             className="w-full aspect-image object-cover rounded-2" width={500} height={500} />
      )}
    </div>
  );
}