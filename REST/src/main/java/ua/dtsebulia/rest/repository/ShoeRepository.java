package ua.dtsebulia.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.dtsebulia.rest.model.Shoe;

public interface ShoeRepository extends JpaRepository<Shoe, Integer> {
}
