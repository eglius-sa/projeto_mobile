import { Alert, Platform } from "react-native";

// No navegador, Alert.alert do react-native-web não faz nada,
// então usamos window.alert / window.confirm nessa plataforma.

export function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n\n${mensagem}`);
    return;
  }
  Alert.alert(titulo, mensagem);
}

export function confirmar(titulo, mensagem, textoConfirmar, onConfirmar) {
  if (Platform.OS === "web") {
    if (window.confirm(`${titulo}\n\n${mensagem}`)) {
      onConfirmar();
    }
    return;
  }
  Alert.alert(titulo, mensagem, [
    { text: "Cancelar", style: "cancel" },
    { text: textoConfirmar, style: "destructive", onPress: onConfirmar },
  ]);
}