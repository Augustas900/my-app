package lt.ca.javau10;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdRepository extends JpaRepository<Ad, Long> {
    List<Ad> findByCategory(String category); // For filtering by category
    List<Ad> findByListingType(ListingType listingType); // For filtering by listing type
}
