package lt.ca.javau10;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;

@Service
public class AdService {
    
    @Autowired
    private AdRepository adRepository;

    public Ad save(Ad ad) {
        return adRepository.save(ad);
    }

    public List<Ad> findAll() {
        return adRepository.findAll();
    }
    public List<Ad> findByCategory(String category) {
        return adRepository.findByCategory(category); // Use a new method in AdRepository
    }

    public void deleteById(Long id) {
        adRepository.deleteById(id);
    }
}


