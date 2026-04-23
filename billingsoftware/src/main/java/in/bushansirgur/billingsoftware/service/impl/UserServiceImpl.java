package in.bushansirgur.billingsoftware.service.impl;

import in.bushansirgur.billingsoftware.entity.UserEntity;
import in.bushansirgur.billingsoftware.io.UserRequest;
import in.bushansirgur.billingsoftware.io.UserResponse;
import in.bushansirgur.billingsoftware.repository.UserRepository;
import in.bushansirgur.billingsoftware.service.FileUploadService;
import in.bushansirgur.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileUploadService fileUploadService;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser = convertToEntity(request);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    @Override
    public UserResponse createUser(UserRequest request, MultipartFile file) throws IOException {
        UserEntity newUser = convertToEntity(request);
        newUser = userRepository.save(newUser);

        if (file != null && !file.isEmpty()) {
            String imgUrl = fileUploadService.uploadFile(file);
            newUser.setProfileImage(imgUrl);
            newUser = userRepository.save(newUser);
        }

        return convertToResponse(newUser);
    }

    private UserResponse convertToResponse(UserEntity newUser) {
        return UserResponse.builder()
                .name(newUser.getName())
                .email(newUser.getEmail())
                .userId(newUser.getUserId())
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .role(newUser.getRole())
                .profileImage(newUser.getProfileImage())
                .build();
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole().toUpperCase())
                .name(request.getName())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for the email: " + email));
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        UserEntity existingUser = userRepository.findByUserId(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        fileUploadService.deleteFile(existingUser.getProfileImage());
        userRepository.delete(existingUser);
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for the email: " + email));
        return convertToResponse(existingUser);
    }

    @Override
    public UserResponse uploadProfileImage(String email, MultipartFile file) throws IOException {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for the email: " + email));

        String imgUrl = fileUploadService.uploadFile(file);

        existingUser.setProfileImage(imgUrl);
        existingUser = userRepository.save(existingUser);

        return convertToResponse(existingUser);
    }

    @Override
    public UserResponse updateProfile(String email, UserRequest request) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for the email: " + email));

        if (request.getName() != null && !request.getName().isEmpty()) {
            existingUser.setName(request.getName());
        }

        if (request.getEmail() != null && !request.getEmail().isEmpty()) {
            existingUser.setEmail(request.getEmail());
        }

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        existingUser = userRepository.save(existingUser);
        return convertToResponse(existingUser);
    }
}
