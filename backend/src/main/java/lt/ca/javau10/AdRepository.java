package lt.ca.javau10;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AdRepository extends JpaRepository<Ad, Long> {
    List<Ad> findByCategory(String category); // New method for filtering ads by category
}