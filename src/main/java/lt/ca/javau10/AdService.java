package lt.ca.javau10;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdService {
    
    @Autowired
    private AdRepository adRepository;

    // Save a new ad or update an existing one
    public Ad save(Ad ad) {
        return adRepository.save(ad);
    }

    // Retrieve all ads
    public List<Ad> findAll() {
        return adRepository.findAll();
    }

    // Find ads by category
    public List<Ad> findByCategory(String category) {
        return adRepository.findByCategory(category); // This method should be defined in AdRepository
    }

    // Delete an ad by its ID
    public void deleteById(Long id) {
        adRepository.deleteById(id);
    }

    // Retrieve ads specifically for rent
    public List<Ad> getAdsForRent() {
        return adRepository.findByListingType(ListingType.RENT); // This method should be defined in AdRepository
    }
    
    // Retrieve ads specifically for sale
    public List<Ad> getAdsForSale() {
        return adRepository.findByListingType(ListingType.SALE); // This method should be defined in AdRepository
    }

	public List<Ad> findByListingType(String upperCase) {
		// TODO Auto-generated method stub
		return null;
	}

	
}



