package in.bushansirgur.billingsoftware.controller;

import in.bushansirgur.billingsoftware.io.FeedbackRequest;
import in.bushansirgur.billingsoftware.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void submitFeedback(@RequestBody FeedbackRequest request, Principal principal) {
        feedbackService.saveFeedback(request, principal.getName());
    }

    @GetMapping
    public java.util.List<in.bushansirgur.billingsoftware.entity.FeedbackEntity> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }
}
