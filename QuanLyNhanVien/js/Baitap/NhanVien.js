function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  chucVu,
  luongCoBan,
  soGioLam
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.chucVu = chucVu;
  this.luongCoBan = luongCoBan;
  this.soGioLam = soGioLam;
}

NhanVien.prototype.tinhTongLuong = function () {
  if (this.chucVu === "Giám đốc") {
    return this.luongCoBan * 3;
  }
  if (this.chucVu === "Trưởng phòng") {
    return this.luongCoBan * 2;
  }
  if (this.chucVu === "Nhân viên") {
    return this.luongCoBan;
  }
};

NhanVien.prototype.xepLoaiNV = function () {
  if (this.soGioLam < 160) {
    return "Trung bình";
  }
  if (this.soGioLam < 176) {
    return "Khá";
  }
  if (this.soGioLam < 192) {
    return "Giỏi";
  }
  return "Xuất sắc";
};
