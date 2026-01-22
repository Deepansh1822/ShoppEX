package in.bushansirgur.billingsoftware.service.impl;

import in.bushansirgur.billingsoftware.entity.ItemEntity;
import in.bushansirgur.billingsoftware.entity.ReviewEntity;
import in.bushansirgur.billingsoftware.io.ReviewRequest;
import in.bushansirgur.billingsoftware.io.ReviewResponse;
import in.bushansirgur.billingsoftware.repository.ItemRepository;
import in.bushansirgur.billingsoftware.repository.ReviewRepository;
import in.bushansirgur.billingsoftware.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ItemRepository itemRepository;

    @Override
    public ReviewResponse addReview(ReviewRequest request, MultipartFile file) throws IOException {
        ItemEntity item = itemRepository.findByItemId(request.getItemId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        ReviewEntity review = new ReviewEntity();
        review.setReviewerName(request.getReviewerName());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setItem(item);

        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID().toString() + "."
                    + StringUtils.getFilenameExtension(file.getOriginalFilename());
            Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            String imageUrl = "http://localhost:8080/api/v1.0/uploads/" + fileName;
            review.setImageUrl(imageUrl);
        }

        ReviewEntity savedReview = reviewRepository.save(review);
        ReviewResponse response = new ReviewResponse();
        BeanUtils.copyProperties(savedReview, response);
        return response;
    }

    @Override
    public List<ReviewResponse> getReviewsByItemId(String itemId) {
        return reviewRepository.findByItemItemIdOrderByCreatedAtDesc(itemId).stream()
                .map(review -> {
                    ReviewResponse response = new ReviewResponse();
                    BeanUtils.copyProperties(review, response);
                    return response;
                })
                .collect(Collectors.toList());
    }
}
