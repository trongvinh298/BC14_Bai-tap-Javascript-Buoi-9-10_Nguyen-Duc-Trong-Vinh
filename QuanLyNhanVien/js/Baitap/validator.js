function Validator() {
  this.errors = {};
}

Validator.prototype.isRequired = function (name, value) {
  if (!value) {
    this.errors[name] = "Vui lòng nhập vào trường này";
    return false;
  }
  return true;
};

Validator.prototype.taiKhoan = function (name, value) {
  if (!/^[A-Za-z0-9]{4,6}$/.test(value)) {
    this.errors[name] =
      "Tài khoản phải chứa 4-6 ký tự (không chứa ký tự đặc biệt, khoảng trống)";
    return false;
  }
  return true;
};

Validator.prototype.email = function (name, value) {
  if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
    this.errors[name] = "Email không đúng định dạng";
    return false;
  }
  return true;
};

Validator.prototype.tenNhanVien = function (name, value) {
  if (
    !/^[a-zA-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ\ ]+$/.test(
      value
    )
  ) {
    this.errors[name] = "Tên nhân viên chỉ được bao gồm chữ";
    return false;
  }
  return true;
};

Validator.prototype.matKhau = function (name, value) {
  if (
    !/(?=.*\d)(?=.*[A-Z])(?=.*[.,_%\+\-\?^&*()!@#$<>`~/]).{6,10}/.test(value)
  ) {
    this.errors[name] =
      "Mật khẩu dài 6-10 ký tự (phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
    return false;
  }
  return true;
};

Validator.prototype.isValidDate = function (name, value) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    this.errors[name] = "Ngày làm không hợp lệ";
    return false;
  }

  var parts = value.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  if (month == 0 || month > 12) {
    this.errors[name] = "Ngày làm không hợp lệ";
    return false;
  }

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }

  if (day > monthLength[month - 1]) {
    this.errors[name] = "Ngày làm không hợp lệ";
    return false;
  }
  return true;
};

Validator.prototype.luongCoBan = function (name, value) {
  if (value < 1_000_000 || value > 20_000_000) {
    this.errors[name] = "Lương cơ bản từ 1.000.000 đến 20.000.000";
    return false;
  }
  return true;
};

Validator.prototype.chucVu = function (name, value) {
  if (value === "Chọn chức vụ") {
    this.errors[name] = "Vui lòng chọn chức vụ";
    return false;
  }
  return true;
};

Validator.prototype.soGioLam = function (name, value) {
  if (value < 80 || value > 200) {
    this.errors[name] = "Số giờ làm từ 80-200 giờ";
    return false;
  }
  return true;
};
