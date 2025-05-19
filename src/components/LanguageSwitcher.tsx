
import React from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage, availableLanguages, t } = useTranslation();

  return (
    <div className="flex items-center">
      <Select value={currentLanguage} onValueChange={setLanguage}>
        <SelectTrigger className="w-[140px]">
          <Globe className="h-4 w-4 mr-2" />
          <SelectValue placeholder={t("language")} />
        </SelectTrigger>
        <SelectContent>
          {availableLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {t(`language.${lang.code.split("-")[0]}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
