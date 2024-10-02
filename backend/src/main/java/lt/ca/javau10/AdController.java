package lt.ca.javau10;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;



@RestController
@RequestMapping("api/ads")
@CrossOrigin(origins = "http://localhost:3000")
public class AdController {

    @Autowired
    private AdService adService;

    @GetMapping
    public ResponseEntity<List<Ad>> getAllAds(@RequestParam(required = false) String category) {
        List<Ad> ads;
        if (category != null) {
            ads = adService.findByCategory(category); // Add this method to your AdService
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
            return ResponseEntity.badRequest().build(); // or send a specific error message
        }
        // Validate price
        if (ad.getPrice() == null || ad.getPrice() < 0) {
            return ResponseEntity.badRequest().build(); // or send a specific error message
        }

        Ad createdAd = adService.save(ad);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAd);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id) {
        adService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        // Logic to save the file (e.g., to the filesystem or database)
        String fileName = fileStorageService.storeFile(file);
        return ResponseEntity.ok(new ResponseMessage("Uploaded the file successfully: " + fileName));
    }
    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileStorageService.loadFileAsResource(filename);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Adjust based on your image type
                .body(file);
    }

}
