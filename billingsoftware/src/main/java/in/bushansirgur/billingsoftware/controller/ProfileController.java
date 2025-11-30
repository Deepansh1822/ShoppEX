package in.bushansirgur.billingsoftware.controller;

import in.bushansirgur.billingsoftware.io.UserResponse;
import in.bushansirgur.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import in.bushansirgur.billingsoftware.io.UserRequest;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponse> getProfile(Principal principal) {
        System.out.println("ProfileController: getProfile called");
        if (principal == null) {
            System.out.println("ProfileController: Principal is null");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        String email = principal.getName();
        System.out.println("ProfileController: Fetching profile for " + email);
        return new ResponseEntity<>(userService.getUserByEmail(email), HttpStatus.OK);
    }

    @PostMapping("/image")
    public ResponseEntity<UserResponse> uploadProfileImage(@RequestParam("image") MultipartFile file,
            Principal principal) throws IOException {
        String email = principal.getName();
        return new ResponseEntity<>(userService.uploadProfileImage(email, file), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateProfile(@RequestBody UserRequest request, Principal principal) {
        String email = principal.getName();
        return new ResponseEntity<>(userService.updateProfile(email, request), HttpStatus.OK);
    }
}
