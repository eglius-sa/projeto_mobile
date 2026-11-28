import { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  StatusBar,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { api } from "../service/api";
import { mostrarAlerta, confirmar } from "../utils/alerts";
import LivroItem from "../components/LivroItem";

export default function LivroListScreen({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function showSuccess(message) {
    setSuccessMessage(message);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSuccessMessage("");
    }, 5000);
  }

  async function carregarLivros(showLoading = true) {
    try {
      if (showLoading) setLoading(true);
      const response = await api.get("/Livros");
      setLivros(response.data);
    } catch (error) {
      mostrarAlerta("Erro", "Não foi possível carregar os livros.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarLivros();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    carregarLivros(false);
  };

  function handleAdd() {
    navigation.navigate("LivroForm", {
      mode: "create",
      onSuccess: (msg) => showSuccess(msg),
    });
  }

  function handleEdit(livro) {
    navigation.navigate("LivroForm", {
      mode: "edit",
      livro,
      onSuccess: (msg) => showSuccess(msg),
    });
  }

  async function deletarLivro(livro) {
    try {
      await api.delete(`/Livros/${livro.id}`);
      setLivros((prev) => prev.filter((c) => c.id !== livro.id));
      showSuccess("Livro excluído com sucesso!");
    } catch (error) {
      mostrarAlerta("Erro", "Não foi possível excluir o livro.");
    }
  }

  function handleDelete(livro) {
    confirmar(
      "Confirmar exclusão",
      `Deseja realmente excluir o livro "${livro.titulo}"?`,
      "Excluir",
      () => deletarLivro(livro)
    );
  }

  function renderItem({ item }) {
    return (
      <LivroItem
        livro={item}
        onPress={() => handleEdit(item)}
        onDelete={() => handleDelete(item)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom", "top"]}>
      <View style={styles.container}>
        <StatusBar style={styles.statusBar} />
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Livros</Text>
          <Pressable style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Novo</Text>
          </Pressable>
        </View>

        {successMessage ? (
          <View style={styles.successBanner}>
            <Text style={styles.successBannerText}>{successMessage}</Text>
          </View>
        ) : null}

        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          <FlatList
            data={livros}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={
              livros.length === 0 && styles.emptyListContainer
            }
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum livro cadastrado.</Text>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F3F4F6",
  },
  statusBar: {
    barStyle: "light-content",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  successBanner: {
    backgroundColor: "#D1FAE5",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#6EE7B7",
  },
  successBannerText: {
    color: "#065F46",
    fontSize: 14,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  loading: {
    marginTop: 32,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
  },
});
