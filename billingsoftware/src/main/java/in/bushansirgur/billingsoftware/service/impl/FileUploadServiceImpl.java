package in.bushansirgur.billingsoftware.service.impl;

import in.bushansirgur.billingsoftware.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @Override
    public String uploadFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        String fileName = UUID.randomUUID().toString() + "."
                + StringUtils.getFilenameExtension(file.getOriginalFilename());
        try {
            Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return "http://localhost:8080" + contextPath + "/uploads/" + fileName;
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An error occurred while uploading the file");
        }
    }

    @Override
    public boolean deleteFile(String imgUrl) {
        if (imgUrl == null || imgUrl.isEmpty()) return true;
        try {
            String fileName = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
            Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
            Path filePath = uploadPath.resolve(fileName);
            return Files.deleteIfExists(filePath);
        } catch (Exception e) {
            return false;
        }
    }
}
