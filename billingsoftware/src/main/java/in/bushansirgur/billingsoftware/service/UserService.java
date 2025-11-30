package in.bushansirgur.billingsoftware.service;

import in.bushansirgur.billingsoftware.io.UserRequest;
import in.bushansirgur.billingsoftware.io.UserResponse;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);

    UserResponse getUserByEmail(String email);

    UserResponse uploadProfileImage(String email, MultipartFile file) throws IOException;

    UserResponse updateProfile(String email, UserRequest request);
}
