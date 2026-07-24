// src/configs/cityConfig.js (hoặc file config tương ứng của bạn)

const CONFIG_CITIES = [
  {
    name: 'Hà Nội',
    code: 'HN',
    districts: [
      'Quận Ba Đình',
      'Quận Hoàn Kiếm',
      'Quận Tây Hồ',
      'Quận Long Biên',
      'Quận Cầu Giấy',
      'Quận Đống Đa',
      'Quận Hai Bà Trưng',
      'Quận Hoàng Mai',
      'Quận Thanh Xuân',
      'Huyện Sóc Sơn',
      'Huyện Đông Anh',
      'Huyện Gia Lâm',
      'Huyện Nam Từ Liêm',
      'Huyện Bắc Từ Liêm'
    ]
  },
  {
    name: 'Hồ Chí Minh',
    code: 'HCM',
    districts: [
      'Quận 1',
      'Quận 3',
      'Quận 4',
      'Quận 5',
      'Quận 6',
      'Quận 7',
      'Quận 8',
      'Quận 10',
      'Quận 11',
      'Quận 12',
      'Quận Bình Tân',
      'Quận Bình Thạnh',
      'Quận Gò Vấp',
      'Quận Phú Nhuận',
      'Quận Tân Bình',
      'Quận Tân Phú',
      'Thành phố Thủ Đức',
      'Huyện Bình Chánh',
      'Huyện Cần Giờ',
      'Huyện Củ Chi',
      'Huyện Hóc Môn',
      'Huyện Nhà Bè'
    ]
  },
  {
    name: 'Đà Nẵng',
    code: 'DN',
    districts: [
      'Quận Hải Châu',
      'Quận Thanh Khê',
      'Quận Sơn Trà',
      'Quận Ngũ Hành Sơn',
      'Quận Liên Chiểu',
      'Quận Cẩm Lệ',
      'Huyện Hòa Vang',
      'Huyện Hoàng Sa'
    ]
  },
  {
    name: 'Hải Phòng',
    code: 'HP',
    districts: [
      'Quận Hồng Bàng',
      'Quận Lê Chân',
      'Quận Ngô Quyền',
      'Quận Kiến An',
      'Quận Hải An',
      'Quận Đồ Sơn',
      'Quận Dương Kinh',
      'Huyện An Dương',
      'Huyện An Lão',
      'Huyện Kiến Thụy',
      'Huyện Tiên Lãng',
      'Huyện Vĩnh Bảo',
      'Huyện Cát Hải',
      'Huyện Bạch Long Vĩ'
    ]
  },
  {
    name: 'Cần Thơ',
    code: 'CT',
    districts: [
      'Quận Ninh Kiều',
      'Quận Ô Môn',
      'Quận Bình Thủy',
      'Quận Cái Răng',
      'Quận Thốt Nốt',
      'Huyện Vĩnh Thạnh',
      'Huyện Cờ Đỏ',
      'Huyện Phong Điền',
      'Huyện Thới Lai'
    ]
  }

  // Bạn có thể tiếp tục bổ sung các Tỉnh / Thành phố khác vào đây theo dạng nested như trên
]

module.exports = {
  CONFIG_CITIES
}
