package in.bushansirgur.billingsoftware.service;

import in.bushansirgur.billingsoftware.io.FeedbackRequest;

public interface FeedbackService {
    void saveFeedback(FeedbackRequest request, String email);

    java.util.List<in.bushansirgur.billingsoftware.entity.FeedbackEntity> getAllFeedback();
}
