// src/utils/imageUtils.ts

/**
 * Hàm này nhận vào `thumb_url` từ đối tượng movie và trả về URL đầy đủ của ảnh thumbnail.
 * @param thumbUrl - Đường dẫn tương đối của ảnh thumbnail (ví dụ: "aitana-bien-hoa-thumb.jpg").
 * @returns URL đầy đủ của ảnh thumbnail.
 */
export const getThumbnailUrl = (thumbUrl: string): string => {
  const baseUrl = 'https://img.ophim.live/uploads/movies/';
  return `${baseUrl}${thumbUrl}`;
};