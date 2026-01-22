package in.bushansirgur.billingsoftware.repository;

import in.bushansirgur.billingsoftware.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    List<ReviewEntity> findByItemItemIdOrderByCreatedAtDesc(String itemId);
}
