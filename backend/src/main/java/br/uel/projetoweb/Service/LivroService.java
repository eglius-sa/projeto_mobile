package br.uel.projetoweb.Service;

import br.uel.projetoweb.Model.Livro;
import br.uel.projetoweb.Repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> listarLivros() {
        return livroRepository.findAll(Sort.by("titulo").ascending());
    }

    public Livro cadastrarLivro(Livro livro){
        if(livroRepository.existsByIsbn(livro.getIsbn())){
            throw new IllegalArgumentException("ISBN já cadastrado");
        }
        return livroRepository.save(livro);
    }

    public Livro buscarLivroPorId(Long id){
        return livroRepository.findById(id).orElse(null);
    }

    public Livro atualizarLivro(Long id, Livro livroAtualizado){
        Livro livro = buscarLivroPorId(id);

        if(livroRepository.existsByIsbnAndIdNot(livroAtualizado.getIsbn(),id)){
            throw new IllegalArgumentException("ISBN já cadastrado");
        }

        if (livro !=  null){
            livro.setTitulo(livroAtualizado.getTitulo());
            livro.setAutor(livroAtualizado.getAutor());
            livro.setIsbn(livroAtualizado.getIsbn());
            livro.setEdicao(livroAtualizado.getEdicao());
            livro.setAno(livroAtualizado.getAno());
            livro.setExemplar(livroAtualizado.getExemplar());

            return livroRepository.save(livro);
        } else{
            throw new RuntimeException("Livro não encontrado por id: " + id);
        }
    }

    public void excluirLivro(Long id) {
        if (!livroRepository.existsById(id)) {
            throw new RuntimeException("Livro não encontrado com id: " + id);
        }
        livroRepository.deleteById(id);
    }
}
