package com.ecommerce.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.service.StorageService;
import com.ecommerce.util.FileUtil;

@Service
public class StorageServiceImpl implements StorageService {

    private final Path uploadPath = Paths.get("uploads", "products");

    @Override
    public String storeFile(MultipartFile file) {
        try {
            Files.createDirectories(uploadPath);
            String fileName = FileUtil.generateFileName(file.getOriginalFilename());
            Path target = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/products/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Impossible d'enregistrer le fichier", e);
        }
    }

    @Override
    public void deleteFile(String fileName) {
        try {
            Path sanitizedFileName = Paths.get(fileName).getFileName();
            if (sanitizedFileName == null) {
                throw new RuntimeException("Nom de fichier invalide");
            }
            Path target = uploadPath.resolve(sanitizedFileName.toString()).normalize();
            Files.deleteIfExists(target);
        } catch (IOException e) {
            throw new RuntimeException("Impossible de supprimer le fichier", e);
        }
    }
}
