package in.bushansirgur.billingsoftware.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.bushansirgur.billingsoftware.io.ReviewRequest;
import in.bushansirgur.billingsoftware.io.ReviewResponse;
import in.bushansirgur.billingsoftware.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/reviews")
    public ReviewResponse addReview(@RequestPart("review") String reviewString,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        ReviewRequest reviewRequest = null;
        try {
            reviewRequest = objectMapper.readValue(reviewString, ReviewRequest.class);
            return reviewService.addReview(reviewRequest, file);
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Error occurred while processing the json");
        }
    }

    @GetMapping("/items/{itemId}/reviews")
    public List<ReviewResponse> getReviews(@PathVariable String itemId) {
        return reviewService.getReviewsByItemId(itemId);
    }
}
