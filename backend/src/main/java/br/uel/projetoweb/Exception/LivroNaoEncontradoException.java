package br.uel.projetoweb.Exception;

public class LivroNaoEncontradoException extends RuntimeException {
    public LivroNaoEncontradoException(Long id) {
        super("Livro não encontrado com id: " + id);
    }
}
