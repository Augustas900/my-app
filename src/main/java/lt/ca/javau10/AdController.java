
package lt.ca.javau10;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/ads")
@CrossOrigin(origins = "http://localhost:3000")
public class AdController {

    @Autowired
    private AdService adService;

    @GetMapping
    public ResponseEntity<List<Ad>> getAllAds(@RequestParam(required = false) String category, 
                                                @RequestParam(required = false) String listingType) {
        List<Ad> ads;
        
        // Fetch ads based on category and listingType
        if (category != null && !category.isEmpty()) {
            ads = adService.findByCategory(category);
        } else if (listingType != null && !listingType.isEmpty()) {
            ads = adService.findByListingType(listingType.toUpperCase());
        } else {
            ads = adService.findAll();
        }
        
        return ResponseEntity.ok(ads);
    }

    @PostMapping
    public ResponseEntity<Ad> createAd(@RequestBody Ad ad) {
        // Validate category
        List<String> validCategories = Arrays.asList(
            "item for sale or rent", 
            "vehicle for sale or rent", 
            "house for sale or rent"
        );

        if (!validCategories.contains(ad.getCategory())) {
            return ResponseEntity.badRequest().body(null); // Return a specific error message if needed
        }

        // Validate price
        if (ad.getPrice() == null || ad.getPrice().compareTo(0.0) < 0) {
            return ResponseEntity.badRequest().body(null); // Return a specific error message if needed
        }

        Ad createdAd = adService.save(ad);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAd);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id) {
        adService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/rent")
    public ResponseEntity<List<Ad>> getRentAds() {
        List<Ad> rentAds = adService.getAdsForRent();
        return ResponseEntity.ok(rentAds);
    }

    @GetMapping("/sale")
    public ResponseEntity<List<Ad>> getSaleAds() {
        List<Ad> saleAds = adService.getAdsForSale();
        return ResponseEntity.ok(saleAds);
    }
    
}
