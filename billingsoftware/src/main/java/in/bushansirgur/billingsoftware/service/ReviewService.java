package in.bushansirgur.billingsoftware.service;

import in.bushansirgur.billingsoftware.io.ReviewRequest;
import in.bushansirgur.billingsoftware.io.ReviewResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ReviewService {

    ReviewResponse addReview(ReviewRequest request, MultipartFile file) throws IOException;

    List<ReviewResponse> getReviewsByItemId(String itemId);
}
