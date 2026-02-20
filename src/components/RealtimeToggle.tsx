"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function RealtimeToggle() {
  const [isEnabled, setIsEnabled] = useState(() => {
    // Inicializar el estado desde localStorage
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('realtime-enabled');
      const initialState = savedState === null ? false : savedState === 'true';
      
      if (savedState === null) {
        localStorage.setItem('realtime-enabled', 'false');
      }
      
      return initialState;
    }
    return false;
  });

  const handleToggle = (checked: boolean) => {
    setIsEnabled(checked);
    localStorage.setItem('realtime-enabled', checked.toString());
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Configuración de Tiempo Real</CardTitle>
        <CardDescription>
          Activa las actualizaciones automáticas cuando se creen nuevos posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3">
          <Switch
            id="realtime-toggle"
            checked={isEnabled}
            onCheckedChange={handleToggle}
          />
          <label htmlFor="realtime-toggle" className="text-sm font-medium">
            Actualizaciones en tiempo real {isEnabled ? 'activadas' : 'desactivadas'}
          </label>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {isEnabled 
            ? 'Los nuevos posts aparecerán automáticamente en la página principal' 
            : 'Deberás recargar la página para ver los nuevos posts'
          }
        </p>
      </CardContent>
    </Card>
  );
}
