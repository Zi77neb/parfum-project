package com.ecommerce.util;

import java.util.UUID;

public class FileUtil {

    public static String generateFileName(String originalFileName) {
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
        }
        return UUID.randomUUID() + extension;
    }

    public static boolean isImageFile(String fileName) {
        return fileName != null && (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png") || fileName.endsWith(".webp"));
    }
}
