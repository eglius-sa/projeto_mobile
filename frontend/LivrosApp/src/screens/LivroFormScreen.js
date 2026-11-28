import { useState } from "react";
import {
  View,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { api } from "../service/api";
import { SafeAreaView } from "react-native-safe-area-context";

const PLACEHOLDER_COLOR = "#9CA3AF";

export default function CLivroFormScreen({ route, navigation }) {
  const { mode, livro, onSuccess } = route.params || {};

  const [titulo, setTitulo] = useState(livro?.titulo || "");
  const [autor, setAutor] = useState(livro?.autor || "");
  const [isbn, setIsbn] = useState(livro?.isbn|| "");
  const [edicao, setEdicao] = useState(livro?.edicao || "");
  const [ano, setAno] = useState(livro?.ano || "");
  const [exemplar, setExemplar] = useState(livro?.exemplar || "");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  async function handleSave() {
  const payload = {
    titulo: titulo.trim(),
    autor: autor.trim(),
    isbn: isbn.trim(),
    edicao: edicao.trim(),
    ano: Number(ano),
    exemplar: Number(exemplar),
  };

  try {
    setSaving(true);

    if (mode === "edit" && livro?.id) {
      await api.put(`/livro/${livro.id}`, payload);
      onSuccess?.("Livro atualizado com sucesso!");
    } else {
      await api.post("/livro", payload);
      onSuccess?.("Livro cadastrado com sucesso!");
    }

    navigation.goBack();
  } catch (error) {
    if (error.response?.data?.errors) {
      setErrors(error.response.data.errors);
    } else {
      setErrors({ general: "Não foi possível salvar o livro." });
    }
  } finally {
    setSaving(false);
  }
}

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "top"]}>
      <View style={styles.container}>
        <StatusBar style={styles.statusBar} />
        <Text style={styles.title}>
          {mode === "edit" ? "Editar Livro" : "Novo Livro"}
        </Text>
        {errors.general && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{errors.general}</Text>
          </View>
        )}
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Título do livro"
        />
        {errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}

        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={autor}
          onChangeText={setAutor}
          placeholder="Nome do autor"
        />
        {errors.autor && <Text style={styles.errorText}>{errors.autor}</Text>}

        <Text style={styles.label}>ISBN</Text>
        <TextInput
          style={styles.input}
          value={isbn}
          onChangeText={setIsbn}
          placeholder="ISBN do livro"
        />
        {errors.isbn && <Text style={styles.errorText}>{errors.isbn}</Text>}

        <Text style={styles.label}>Edição</Text>
        <TextInput
          style={styles.input}
          value={edicao}
          onChangeText={setEdicao}
          placeholder="Edição"
        />
        {errors.edicao && <Text style={styles.errorText}>{errors.edicao}</Text>}

        <Text style={styles.label}>Ano</Text>
        <TextInput
          style={styles.input}
          value={ano}
          onChangeText={setAno}
          placeholder="Ano de publicação"
          keyboardType="numeric"
        />
        {errors.ano && <Text style={styles.errorText}>{errors.ano}</Text>}

        <Pressable
          style={[styles.button, saving && styles.buttonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.buttonText}>
            {saving ? "Salvando..." : "Salvar"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
  },
  statusBar: {
    barStyle: "light-content",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 12,
  },
  errorBanner: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorBannerText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "500",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
    marginTop: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  button: {
    marginTop: 24,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
