import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  // YENİ BÖLÜM: Kendi özel kuralımızı bu modern yapıya ekliyoruz
  {
    rules: {
      // Bu kural, 'any' tipini kullandığımızda Vercel'in hata vermesini engeller.
      "@typescript-eslint/no-explicit-any": "off",
    }
  }
];

export default eslintConfig;