import { View, Text, StyleSheet, Pressable } from "react-native";

export default function LivroItem({ livro, onPress, onDelete }) {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemTitulo}>{livro.titulo}</Text>

        <View style={styles.buttonsContainer}>
          <Pressable onPress={onPress} style={styles.editButton}>
            <Text style={styles.editText}>Editar</Text>
          </Pressable>
          <Pressable onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.itemIsbn}>{livro.Isbn}</Text>
      {livro.ano && livro.adicao && (
        <Text style={styles.itemAutor}>Autor {livro.autor}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // nome à esquerda, grupo de botões à direita
    alignItems: "center",
  },
  itemTitulo: {
    fontSize: 18,
    fontWeight: "600",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemISBN: {
    color: "#4B5563",
    marginTop: 4,
  },
  itemAutor: {
    color: "#6B7280",
    marginTop: 2,
  },
  editButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  deleteButton: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  editText: {
    color: "#2563EB",
    fontWeight: "500",
  },
  deleteText: {
    color: "#DC2626",
    fontWeight: "500",
  },
});
