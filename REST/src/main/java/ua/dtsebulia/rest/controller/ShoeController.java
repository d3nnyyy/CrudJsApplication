package ua.dtsebulia.rest.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.dtsebulia.rest.model.Shoe;
import ua.dtsebulia.rest.service.ShoeService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/shoes")
@Slf4j
public class ShoeController {

    private final ShoeService shoeService;

    @GetMapping
    public ResponseEntity<Iterable<Shoe>> getAllShoes() {

        log.info("ShoeController::getAllShoes");

        return ResponseEntity.ok(shoeService.getAllShoes());

    }

    @PostMapping
    public ResponseEntity<List<Shoe>> createShoe(@RequestBody Shoe shoe) {

        log.info("ShoeController::createShoe request body: {}", shoe);

        return ResponseEntity.ok(shoeService.createShoe(shoe));

    }

    @PutMapping("/{id}")
    public ResponseEntity<Shoe> updateShoe(@PathVariable Integer id, @RequestBody Shoe shoe) {

        log.info("ShoeController::updateShoe request body: {}", shoe);

        return ResponseEntity.ok(shoeService.updateShoe(id, shoe));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShoe(@PathVariable Integer id) {

        log.info("ShoeController::deleteShoe request body: {}", id);

        shoeService.deleteShoe(id);

        return ResponseEntity.ok().build();

    }

}
