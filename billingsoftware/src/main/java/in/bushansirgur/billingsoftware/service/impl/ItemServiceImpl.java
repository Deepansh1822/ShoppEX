package in.bushansirgur.billingsoftware.service.impl;

import in.bushansirgur.billingsoftware.entity.CategoryEntity;
import in.bushansirgur.billingsoftware.entity.ItemEntity;
import in.bushansirgur.billingsoftware.io.ItemRequest;
import in.bushansirgur.billingsoftware.io.ItemResponse;
import in.bushansirgur.billingsoftware.repository.CategoryRepository;
import in.bushansirgur.billingsoftware.repository.ItemRepository;
import in.bushansirgur.billingsoftware.service.FileUploadService;
import in.bushansirgur.billingsoftware.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final FileUploadService fileUploadService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) throws IOException {
        String imgUrl = fileUploadService.uploadFile(file);
        ItemEntity newItem = convertToEntity(request);
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found: " + request.getCategoryId()));
        newItem.setCategory(existingCategory);
        newItem.setImgUrl(imgUrl);
        newItem = itemRepository.save(newItem);
        return convertToResponse(newItem);
    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedAt(newItem.getUpdatedAt())
                .averageRating(newItem.getAverageRating())
                .totalReviews(newItem.getTotalReviews())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity -> convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingItem = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found: " + itemId));
        fileUploadService.deleteFile(existingItem.getImgUrl());
        itemRepository.delete(existingItem);
    }
}
