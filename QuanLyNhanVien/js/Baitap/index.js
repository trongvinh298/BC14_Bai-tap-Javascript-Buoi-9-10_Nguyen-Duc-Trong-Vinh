document.getElementById("btnThemNV").addEventListener("click", themNhanVien);
document.getElementById("btnThem").addEventListener("click", resetForm);
document.getElementById("btnTimNV").addEventListener("click", timKiemNhanVien);

document.getElementById("btnCapNhat").addEventListener("click", capNhatNV);
document
  .getElementById("tableDanhSach")
  .addEventListener("click", delegationTable);

var qlnv = new QuanLyNhanVien();
qlnv.khoiTao();
hienThi(qlnv.dsnv);

function themNhanVien() {
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCoBan = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucVu").value;
  var soGioLam = +document.getElementById("gioLam").value;

  var nhanVien = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    chucVu,
    luongCoBan,
    soGioLam
  );

  validateUpdate();

  var isValid = xacThucDuLieu(nhanVien);

  if (!isValid) {
    return;
  }
  qlnv.themNhanVien(nhanVien);

  hienThi(qlnv.dsnv);
  resetForm();
}

function capNhatNV() {
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCoBan = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucVu").value;
  var soGioLam = +document.getElementById("gioLam").value;

  var nhanVien = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    chucVu,
    luongCoBan,
    soGioLam
  );
  validateUpdate();

  var isValid = xacThucDuLieu(nhanVien);

  if (!isValid) {
    return;
  }
  qlnv.capNhatNhanVien(nhanVien);
  hienThi(qlnv.dsnv);
  resetForm();
}

function hienThi(danhSachNV) {
  var tbody = document.getElementById("tableDanhSach");
  var html = "";
  for (var i = 0; i < danhSachNV.length; i++) {
    var nv = danhSachNV[i];
    html += `
        <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tinhTongLuong()}</td>
        <td>${nv.xepLoaiNV()}</td>
        <td>
        <button type="button" class="btn btn-primary" data-tknv = ${
          nv.taiKhoan
        }  data-toggle="modal"
        data-target="#myModal"
        data-action="select">Cập nhật</button>
        <button type="button" class="btn btn-danger" data-tknv = ${
          nv.taiKhoan
        } data-action="delete">Xoá</button>
        </td>
        </tr>`;
  }
  tbody.innerHTML = html;
}

function resetForm() {
  updateForm({});
  document.getElementById("tknv").disabled = false;
  validateUpdate();
}

function updateForm(nhanVien) {
  document.getElementById("tknv").value = nhanVien.taiKhoan || "";
  document.getElementById("name").value = nhanVien.hoTen || "";
  document.getElementById("email").value = nhanVien.email || "";
  document.getElementById("password").value = nhanVien.matKhau || "";
  document.getElementById("datepicker").value = nhanVien.ngayLam || "";
  document.getElementById("luongCB").value = nhanVien.luongCoBan || "";
  document.getElementById("chucVu").value = nhanVien.chucVu || "";
  document.getElementById("gioLam").value = nhanVien.soGioLam || "";
}

function chonNhanVien(taiKhoan) {
  var nhanVien = qlnv.chonNhanVien(taiKhoan);
  updateForm(nhanVien);
  document.getElementById("tknv").disabled = true;
}

function xoaNhanVien(taiKhoan) {
  qlnv.xoaNhanVien(taiKhoan);
  hienThi(qlnv.dsnv);
}

function delegationTable(event) {
  var taiKhoan = event.target.getAttribute("data-tknv");
  var action = event.target.getAttribute("data-action");

  if (action === "select") {
    chonNhanVien(taiKhoan);
  }

  if (action === "delete") {
    xoaNhanVien(taiKhoan);
  }
}

function timKiemNhanVien() {
  var search = document.getElementById("searchName").value;
  var newDsnv = qlnv.timKiemNhanVien(search);
  hienThi(newDsnv);
  document.getElementById("searchName").value = "";
}

function xacThucDuLieu(nhanVien) {
  var validator = new Validator();
  var isValid =
    validator.isRequired("tbTKNV", nhanVien.taiKhoan) &&
    validator.taiKhoan("tbTKNV", nhanVien.taiKhoan);
  isValid &=
    validator.isRequired("tbTen", nhanVien.hoTen) &&
    validator.tenNhanVien("tbTen", nhanVien.hoTen);
  isValid &=
    validator.isRequired("tbEmail", nhanVien.email) &&
    validator.email("tbEmail", nhanVien.email);
  isValid &=
    validator.isRequired("tbMatKhau", nhanVien.matKhau) &&
    validator.matKhau("tbMatKhau", nhanVien.matKhau);
  isValid &=
    validator.isRequired("tbNgay", nhanVien.ngayLam) &&
    validator.isValidDate("tbNgay", nhanVien.ngayLam);
  isValid &=
    validator.isRequired("tbLuongCB", nhanVien.luongCoBan) &&
    validator.luongCoBan("tbLuongCB", nhanVien.luongCoBan);
  isValid &=
    validator.isRequired("tbChucVu", nhanVien.chucVu) &&
    validator.chucVu("tbChucVu", nhanVien.chucVu);
  isValid &=
    validator.isRequired("tbGiolam", nhanVien.soGioLam) &&
    validator.soGioLam("tbGiolam", nhanVien.soGioLam);

  if (!isValid) {
    for (var key in validator.errors) {
      document.getElementById(key).innerHTML = validator.errors[key];
      document.getElementById(key).style.display = "block";
    }
    return false;
  }
  return true;
}
function validateUpdate() {
  var unerrors = document.getElementsByClassName("sp-thongbao");
  for (var i = 0; i < unerrors.length; i += 1) {
    unerrors[i].style.display = "none";
  }
}
