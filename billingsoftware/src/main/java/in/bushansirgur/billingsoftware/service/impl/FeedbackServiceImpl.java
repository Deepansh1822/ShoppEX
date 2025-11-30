package in.bushansirgur.billingsoftware.service.impl;

import in.bushansirgur.billingsoftware.entity.FeedbackEntity;
import in.bushansirgur.billingsoftware.io.FeedbackRequest;
import in.bushansirgur.billingsoftware.repository.FeedbackRepository;
import in.bushansirgur.billingsoftware.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    @Override
    public void saveFeedback(FeedbackRequest request, String email) {
        FeedbackEntity feedback = FeedbackEntity.builder()
                .email(email)
                .q1(request.getQ1())
                .q2(request.getQ2())
                .q3(request.getQ3())
                .q4(request.getQ4())
                .comments(request.getComments())
                .build();
        feedbackRepository.save(feedback);
    }

    @Override
    public java.util.List<FeedbackEntity> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
