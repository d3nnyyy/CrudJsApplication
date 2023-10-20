package ua.dtsebulia.rest.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ua.dtsebulia.rest.exception.ShoeNotFoundException;
import ua.dtsebulia.rest.model.Shoe;
import ua.dtsebulia.rest.repository.ShoeRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShoeService {

    private final ShoeRepository shoeRepository;

    public List<Shoe> createShoe(Shoe shoe) {
        log.info("ShoeService::createShoe, shoe: {}", shoe);
        shoeRepository.save(shoe);
        return shoeRepository.findAll();
    }

    public Shoe updateShoe(Integer id, Shoe shoe) {

        var shoeToUpdate = shoeRepository.findById(id).orElseThrow(
                () -> new ShoeNotFoundException("Shoe not found with id: " + id)
        );

        log.info("ShoeService::updateShoe, shoeToUpdate: {}", shoeToUpdate);

        if (shoe.getName() != null) shoeToUpdate.setName(shoe.getName());
        if (shoe.getPrice() != null) shoeToUpdate.setPrice(shoe.getPrice());
        if (shoe.getSize() != null) shoeToUpdate.setSize(shoe.getSize());
        if (shoe.getColor() != null) shoeToUpdate.setColor(shoe.getColor());

        log.info("ShoeService::updateShoe, shoe: {}", shoeToUpdate);

        return shoeRepository.save(shoeToUpdate);


    }

    public void deleteShoe(Integer id) {
        log.info("ShoeService::deleteShoe, id: {}", id);
        shoeRepository.deleteById(id);
    }

    public List<Shoe> getAllShoes() {
        log.info("ShoeService::getAllShoes");
        return shoeRepository.findAll();
    }
}
